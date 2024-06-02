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

This app is built using Typescript, React, Node, Express

## Running the application

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
