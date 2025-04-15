
import React ,  { useState, useEffect}from 'react';
import {Portal, createListCollection, Input , Select , Text, Box} from "@chakra-ui/react"
import { router } from '@inertiajs/react'; 
import { SimpleGrid } from "@chakra-ui/react"

  type TaskFilterProps = {
    statuses: { [key: string]: string };
  }
  const TaskFilter: React.FC<TaskFilterProps> = ({ statuses }) => {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
  
    const statusesarray = Object.entries(statuses).map(([value, label]) => ({ value, label }));
    const frameworks = createListCollection({ items: statusesarray });
  
    // Hàm gửi GET request
    const handleFilterChange = () => {
      // Gửi GET request với các tham số
      const filters: Record<string, string> = {};
      console.log(status);
        if (title) filters.title = title;
        if (status) filters.status = status;
        if (startDate) filters.start_date = startDate;
        if (startTime) filters.start_time = startTime;
        if (endDate) filters.end_date = endDate;
        if (endTime) filters.end_time = endTime;
        console.log(filters);
        router.get('/tasks', filters, {
          preserveState: true,
  });
    };
    useEffect(() => {
      handleFilterChange();
    }, [status]);
    // Sử dụng useEffect để theo dõi sự thay đổi và gửi request
    // useEffect(() => {
    //   handleFilterChange();
    // }, [title, status, startDate, startTime, endDate, endTime]);
  
    return (
      <Box mb={4}>
        <SimpleGrid columns={3} gap="40px">
          <Box>
            <Text fontSize="sm" mb={1}>
              Title
            </Text>
            <Input
              size="sm"
              value={title}
              onChange={(e) => { setTitle(e.target.value); handleFilterChange();}}
            />
          </Box>
          <Box>
            <Select.Root deselectable collection={frameworks} size="sm" onValueChange={(details) => {setStatus(details.value[0] ?? '');handleFilterChange();} }>
              <Select.HiddenSelect />
                <Select.Label>Select framework</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText/>
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {frameworks.items.map((framework) => (
                      <Select.Item item={framework} key={framework.value}>
                        {framework.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </Box>
          <Box>
            <Text fontSize="sm" mb={1}>
              Start Date
            </Text>
            <Input
              type="date"
              size="sm"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Box>
          <Box>
            <Text fontSize="sm" mb={1}>
              Start Time
            </Text>
            <Input
              type="time"
              size="sm"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Box>
          <Box>
            <Text fontSize="sm" mb={1}>
              End Date
            </Text>
            <Input
              type="date"
              size="sm"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Box>
          <Box>
            <Text fontSize="sm" mb={1}>
              End Time
            </Text>
            <Input
              type="time"
              size="sm"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </Box>
        </SimpleGrid>
      </Box>
    );
  };
  
  export default TaskFilter;