import { eq } from "drizzle-orm";
import { db } from ".";
import { accounts } from "./schema";

export const getAccountByUserId = async (userId: string) => {
  const account = await db.query.accounts.findFirst({
    where: eq(accounts.userId, userId),
  });

  return account;
};
