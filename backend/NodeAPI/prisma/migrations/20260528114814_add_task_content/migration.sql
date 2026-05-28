-- CreateTable
CREATE TABLE "TaskContent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "TaskContent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaskContent" ADD CONSTRAINT "TaskContent_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
