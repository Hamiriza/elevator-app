# Tech Interview Challenge

## Problem Statement

Imagine you work for an elevator company. You are tasked with creating a software problem with the goal of estimating the amount of time it takes for an elevator to depart some floor, F1, and arrive in some other floor, F2. You should consider acceleration and deceleration time and distance. You also should allow for variable heights for different floors. You should also assume a maximum speed above which the elevator must not go.

## Equations of motion reference

1. $` v = u + at `$
2. $` s = {(u + v) \over 2}t `$
3. $` v^2 = u^2 + 2as `$
4. $` s = ut + (1/2)at^2 `$
5. $` s = vt - (1/2) at^2 `$

time $t$ = seconds s  
displacement $s$ = metres m  
velocity $v$ or $u$ = metres per second ms⁻¹  
acceleration $a$ = metres per second per second ms⁻²

## Equations and approach to calculate travel time and peak speed

1. acceleration time = $`t₁`$ = $`vₘ \over a`$
2. acceleration distance = $`s₁`$ = $`{1 \over 2}at₁^2`$
3. deceleration time = $`t₂`$ = $`vₘ \over d`$
4. deceleration distance = $`s₂`$ = $`{1 \over 2}dt₂^2`$
5. if distance <= $`s₁ + s₂ `$

- $`vₚ = at₁`$
- $`vₚ = dt₂`$
- $`s = {1 \over 2}at₁^2 + {1 \over 2}dt₂^2 `$
- peak speed = $`vₚ =\sqrt{{2sad}\over(a+d)} `$
- travel time = $`{2vₚ}\over(a+d)`$

6. otherwise

- constant speed distance = distance - acceleration time - deceleration time
- constant speed time = constant speed distance / max speed
- travel time = acceleration time + constant speed time + deceleration time

displacement $s$ = metres m  
peak speed $vₚ$ or $u$ = metres per second ms⁻¹  
acceleration $a$ = metres per second per second ms⁻²
deceleration $d$ = metres per second per second ms⁻²

## Setup

This app is built using Typescript, React, Redux, Node, Express  
There are two ways to run the application:

1. Running the services manually
2. Docker and Docker Compose

## 1. Running the services manually

Both frontend and backend need to be run in a separate terminal.

### Start the frontend

At the project root directory, enter the command shown below:

```bash
npm run start:frontend
```

The frontend will run on port 4000

### Start the backend

At the project root directory, enter the command shown below:

```bash
npm run start:backend
```

The backend will run on port 4001

## 2. Docker and Docker Compose

Docker provides an containerization technology that allows us to run the same application in an isolated environment which is not affected by the host OS configuration, but still faster than virtual machine.

To build the application, run the following command in the project root directory (this may take some time):

`docker-compose build`

To start the application, use this command:

`docker-compose up -d`

Verify that all three services are Up by running:

`docker-compose ps`

To view the logs generated by the services, use:

`docker-compose logs`

For logs of a specific service:

`docker-compose logs <service name>`

To follow the logs in real-time:

`docker-compose logs -f`

The services are now set up, and you can submit HTTP requests using the `curl` command or other tools like Postman.

### If something went wrong...

If the `State` of the services are not `Up`, we can first stop and remove the containers by running commands:

`docker-compose stop`

`docker-compose rm`

`docker system prune -a`

`docker-compose build`

`docker-compose up`

And try to access the services
