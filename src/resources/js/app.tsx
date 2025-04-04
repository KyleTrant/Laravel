import '../css/app.css';
import './bootstrap';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Provider } from "@/Components/ui/provider"
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(
    `./Pages/${name}.tsx`,
    import.meta.glob('./Pages/**/*.tsx',)
  ),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      <Provider>
        <App {...props} />
      </Provider>
    );
  },
  progress: {
    color: '#4B5563',
  },
});