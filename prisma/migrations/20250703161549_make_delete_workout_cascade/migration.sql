-- DropForeignKey
ALTER TABLE "ExercisesInWorkout" DROP CONSTRAINT "ExercisesInWorkout_workoutId_fkey";

-- AddForeignKey
ALTER TABLE "ExercisesInWorkout" ADD CONSTRAINT "ExercisesInWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
