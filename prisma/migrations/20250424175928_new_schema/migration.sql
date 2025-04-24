/*
  Warnings:

  - You are about to drop the column `meta_description` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `meta_keywords` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `file_url` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Vlog` table. All the data in the column will be lost.
  - You are about to drop the column `meta_description` on the `Vlog` table. All the data in the column will be lost.
  - You are about to drop the column `meta_keywords` on the `Vlog` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Vlog` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail_url` on the `Vlog` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[image_url]` on the table `Photo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Poem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Poem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image_url` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Poem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Photo_file_url_key";

-- DropIndex
DROP INDEX "Vlog_slug_key";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "meta_description",
DROP COLUMN "meta_keywords";

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "file_url",
ADD COLUMN     "image_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Poem" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vlog" DROP COLUMN "duration",
DROP COLUMN "meta_description",
DROP COLUMN "meta_keywords",
DROP COLUMN "slug",
DROP COLUMN "thumbnail_url";

-- CreateIndex
CREATE UNIQUE INDEX "Photo_image_url_key" ON "Photo"("image_url");

-- CreateIndex
CREATE UNIQUE INDEX "Poem_title_key" ON "Poem"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Poem_slug_key" ON "Poem"("slug");
