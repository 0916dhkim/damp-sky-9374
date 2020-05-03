# damp-sky-9374
JSON Course Schedule Viewer

# Try It Yourself
Damp Sky Course Schedule Viewer is hosted at Heroku.

https://damp-sky-9374.herokuapp.com/

You need two things to use the application.

First, a json string describing all available courses and their time slots.

Example json file:
```json
[
    {
        "name": "TTE3979",
        "options": [
            [
                {
                    "day": "Mon",
                    "startTime": {
                        "hour": 16,
                        "minute": 35
                    },
                    "endTime": {
                        "hour": 19,
                        "minute": 35
                    }
                }
            ],
            [
                {
                    "day": "Thu",
                    "startTime": {
                        "hour": 12,
                        "minute": 15
                    },
                    "endTime": {
                        "hour": 14,
                        "minute": 15
                    }
                },
                {
                    "day": "Fri",
                    "startTime": {
                        "hour": 20,
                        "minute": 30
                    },
                    "endTime": {
                        "hour": 21,
                        "minute": 30
                    }
                }
            ]
        ]
    },
    {
        "name": "MAT1850",
        "options": [
            [
                {
                    "day": "Tue",
                    "startTime": {
                        "hour": 18,
                        "minute": 5
                    },
                    "endTime": {
                        "hour": 19,
                        "minute": 5
                    }
                },
                {
                    "day": "Mon",
                    "startTime": {
                        "hour": 15,
                        "minute": 40
                    },
                    "endTime": {
                        "hour": 17,
                        "minute": 40
                    }
                }
            ]
        ]
    },
```

Second, a semicolon-separated list of desired courses to take.

After you have those two forms filled in, you can click "display" button to see all possible schedules consisting of your desired courses. The purpose of this application is to allow users to plan their course schedules more efficiently.

# Contribute
This project uses typescript and webpack, therefore needs building step before running. Build the project with the following command.
```
npm run build
```
And start the web application server.
```
npm start
```
Run unit-tests.
```
npm test
```
`launch.json` file for VSCode is provided.
