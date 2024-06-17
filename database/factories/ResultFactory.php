<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Result>
 */
class ResultFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => $this->faker->numberBetween(1, 3),
            'cholesterol_level' => $this->faker->numberBetween(120, 240),
            'glucose_level' => $this->faker->numberBetween(80, 200),
            'systole' => $this->faker->numberBetween(90, 180),
            'diastole' => $this->faker->numberBetween(60, 120),
            'weight' => $this->faker->numberBetween(50, 120),
            'height' => $this->faker->numberBetween(150, 200),
            'is_smoking' => $this->faker->boolean,
            'is_exercising' => $this->faker->boolean,
            'prediction' => $this->faker->randomFloat(2, 0, 1)
        ];
    }
}
