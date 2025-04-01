import { chefShowsDBClient } from "../prisma/client";
import { parse } from "csv-parse/sync"; // You'll need to install this package
import { readFileSync } from "fs";
import { Source } from "@prisma/client";

function getSource(sources: Record<string, string>) {
  return Object.keys(sources).find(key => sources[key] === "1") || Source.OTHER;
}

async function seedData() {
  try {
    // Read and parse CSV file
    const fileContent = readFileSync("./scripts/chef_movies_data.csv", "utf-8");
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    // Clear existing data if needed
    await chefShowsDBClient.shows.deleteMany({});
    // // Insert new records
    for (const record of records) {
      const sources = {
        [Source.DISNEY_PLUS]: record["Disney+"],
        [Source.HULU]: record["Hulu"],
        [Source.NETFLIX]: record["Netflix"],
        [Source.PRIME_VIDEO]: record["Prime Video"],
      };

      await chefShowsDBClient.shows.create({
        data: {
          title: record.Title,
          year: parseInt(record.Year) || 0,
          age: parseInt(record.Age) || 0,
          imdb: parseFloat(record.IMDb) || 0,
          rottenTomatoes: parseInt(record["Rotten Tomatoes"]) || 0,
          source: getSource(sources) as Source,
        },
      });
    }

    console.log("Data seeding completed successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
    throw error;
  } finally {
    await chefShowsDBClient.$disconnect();
  }
}

seedData();
