import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: 'index.html',
        about: 'about.html',
        people: 'people.html',
        events: 'events.html',
        supportGroupsGeneral: 'support-groups-general.html',
        supportGroupsWomens: 'support-groups-womens.html',
        supportGroupsMens: 'support-groups-mens.html',
        pride: 'pride.html',
      },
    },
  },
});

