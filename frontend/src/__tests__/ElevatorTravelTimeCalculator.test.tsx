import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ElevatorTravelTimeCalculator from "../components/ElevatorTravelTimeCalculator";

describe("ElevatorTravelTimeCalculator", () => {
  beforeEach(() => {
    // Mock the global fetch function
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("renders the form correctly", () => {
    render(<ElevatorTravelTimeCalculator />);
    expect(
      screen.getByText("Elevator Travel Time Calculator")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Number of Floors:")).toBeInTheDocument();
    expect(screen.getByLabelText("Acceleration (m/s²):")).toBeInTheDocument();
    expect(screen.getByLabelText("Deceleration (m/s²):")).toBeInTheDocument();
    expect(screen.getByLabelText("Max Speed (m/s):")).toBeInTheDocument();
    expect(screen.getByLabelText("Start Floor:")).toBeInTheDocument();
    expect(screen.getByLabelText("End Floor:")).toBeInTheDocument();
    expect(screen.getByText("Calculate")).toBeInTheDocument();
  });

  test("calculates travel time and peak speed correctly", async () => {
    // Mock the fetch response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ travelTime: 10.5, peakSpeed: 1.8 }),
    });

    // Render the component
    render(<ElevatorTravelTimeCalculator />);

    // Simulate providing valid input values
    fireEvent.change(screen.getByLabelText("Number of Floors:"), {
      target: { value: "10" },
    });
    fireEvent.blur(screen.getByLabelText("Number of Floors:"));

    fireEvent.change(screen.getByLabelText("Height of Floor 1 (m):"), {
      target: { value: "3" },
    });
    fireEvent.change(screen.getByLabelText("Acceleration (m/s²):"), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText("Deceleration (m/s²):"), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText("Max Speed (m/s):"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText("Start Floor:"), {
      target: { value: "0" },
    });
    fireEvent.change(screen.getByLabelText("End Floor:"), {
      target: { value: "9" },
    });

    // Trigger the calculation
    fireEvent.click(screen.getByText("Calculate"));

    // Wait for the result to be displayed
    await waitFor(() => {
      expect(
        screen.getByText(/Estimated travel time: \d+\.\d+ seconds/)
      ).toBeInTheDocument();
      expect(screen.getByText(/Peak speed: \d+\.\d+ m\/s/)).toBeInTheDocument();
    });
  });

  test("prevents setting start and end floor beyond the number of floors", () => {
    render(<ElevatorTravelTimeCalculator />);

    fireEvent.change(screen.getByLabelText("Number of Floors:"), {
      target: { value: "5" },
    });
    fireEvent.blur(screen.getByLabelText("Number of Floors:"));

    fireEvent.change(screen.getByLabelText("Start Floor:"), {
      target: { value: "6" },
    });
    expect(screen.getByLabelText("Start Floor:")).toHaveValue(4);

    fireEvent.change(screen.getByLabelText("End Floor:"), {
      target: { value: "10" },
    });
    expect(screen.getByLabelText("End Floor:")).toHaveValue(4);
  });

  test("handles invalid number of floors gracefully", () => {
    render(<ElevatorTravelTimeCalculator />);

    // Simulate entering a negative number of floors
    fireEvent.change(screen.getByLabelText("Number of Floors:"), {
      target: { value: "-1" },
    });
    fireEvent.blur(screen.getByLabelText("Number of Floors:"));

    // Assert that the number of floors is reset to 1
    expect(screen.getByLabelText("Number of Floors:")).toHaveValue(1);
  });
});
