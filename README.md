This is a [Next.js](https://nextjs.org/) project bootstrapped.

# Weather application

## Required

1. nodeJS (latest version)
2. yarn

## How to run this project

Run these command in sequence

```bash
yarn install # npm install
yarn dev # npm run dev
```

## Tech stack with Typescript

1. [Nextjs 13](https://nextjs.org/)
2. [Zustand](https://github.com/pmndrs/zustand)
3. [React-select](https://react-select.com/home)
4. [Tailwindcss](https://tailwindcss.com/)
5. [React-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
6. [Open-weather-map](https://openweathermap.org/)
7. [Dayjs](https://day.js.org/en/)
8. [Axios](https://axios-http.com/docs/intro)

## Features

### Note: The repo is using state to manage data instead of saving to database. So the data will lost if the page get refreshed.

1. User can view Singapore hourly weather [current weather](https://openweathermap.org/current) and [forecast](https://openweathermap.org/forecast5) (up to 5 days) by default
2. User can search cities by name which is using [geocoding api](https://openweathermap.org/current#geocoding)
3. After user search a city and view the weather, they can add the city to widget.
4. User can remove widget
5. User can drag and drop widgets.
6. User can select a widget to view the weather and forecast.

### Structure

- `app`: pages
- `app/components`: server components
- `src/modules`: Page container
- `src/enums`: Define enums
- `src/models`: Define type and interface
- `src/contants`: Define constant
- `src/hooks`: Define hooks
- `src/utils`: Define utililty functions.
- `src/zustand-store`: Define zustand store
- `src/components`: Define client components
- `src/**/components`: Define components that is used for only the parent
