import { pgTable,serial,text,varchar,timestamp,uuid } from "drizzle-orm/pg-core";
import { title } from "process";

export const MockInterview = pgTable('mockInterview',{
    id:serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt').notNull(),
    mockId:varchar('mockId').notNull() 
})

export const UserAnswer = pgTable('userAnswer',{
    id: serial('id').primaryKey(),
    mockIdRef: varchar('mockId').notNull(),
    question: varchar('question').notNull(),
    correctAns: text('correctAns'),
    userAns: text('userAns'),
    feedback: text('feedback'),
    rating: varchar('rating'),
    userEmail: varchar('userEmail'),
    createdAt: varchar('createdAt')
})

export const resumes = pgTable("resumes", {
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  address: text("address").notNull(),
  jobTitle: text("jobTitle").notNull(),
  phone: varchar("phone").notNull(),
  email: varchar("email").notNull(),
  summary: text("summary").notNull(),
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  resumeId: uuid("resume_id").defaultRandom().notNull(),
  userEmail: text("user_email").notNull(),
  userName: text("user_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const experience = pgTable("experience", {
  id: serial("id").primaryKey(),
  resumeId: uuid("resume_id").defaultRandom().notNull(),
  positionTitle : text("positionTitle").notNull(),
  companyName : text("companyName").notNull(),
  city : text("city").notNull(),
  state : text("state").notNull(),
  startDate : text("startDate").notNull(),
  endDate : text("endDate").notNull(),
  workSummary : text("workSummary").notNull(),
});