export class Elevator {
  private acceleration: number;
  private deceleration: number;
  private maxSpeed: number;
  private floorHeights: number[];

  constructor(
    acceleration: number,
    deceleration: number,
    maxSpeed: number,
    floorHeights: number[]
  ) {
    this.acceleration = acceleration;
    this.deceleration = deceleration;
    this.maxSpeed = maxSpeed;
    this.floorHeights = floorHeights;
  }

  private getDistance(floor1: number, floor2: number): number {
    let distance = 0;
    for (let i = Math.min(floor1, floor2); i < Math.max(floor1, floor2); i++) {
      distance += this.floorHeights[i];
    }
    return distance;
  }

  private calculateTimeForPhase(
    velocity: number,
    acceleration: number
  ): number {
    return velocity / acceleration;
  }

  private calculateDistanceForPhase(
    velocity: number,
    acceleration: number
  ): number {
    return (velocity * velocity) / (2 * acceleration);
  }

  public calculateTravelTime(floor1: number, floor2: number): number {
    const distance = this.getDistance(floor1, floor2);
    const accelTime = this.calculateTimeForPhase(
      this.maxSpeed,
      this.acceleration
    );
    const decelTime = this.calculateTimeForPhase(
      this.maxSpeed,
      this.deceleration
    );
    const accelDistance = this.calculateDistanceForPhase(
      this.maxSpeed,
      this.acceleration
    );
    const decelDistance = this.calculateDistanceForPhase(
      this.maxSpeed,
      this.deceleration
    );
    const totalAccelDecelDistance = accelDistance + decelDistance;

    if (distance <= totalAccelDecelDistance) {
      const totalTime = Math.sqrt(
        (2 * distance) / (this.acceleration + this.deceleration)
      );
      return totalTime;
    } else {
      const constantSpeedDistance = distance - totalAccelDecelDistance;
      const constantSpeedTime = constantSpeedDistance / this.maxSpeed;
      const totalTime = accelTime + constantSpeedTime + decelTime;
      return totalTime;
    }
  }
}
