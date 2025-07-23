CREATE TABLE "mockInterview" (
	"id" serial PRIMARY KEY NOT NULL,
	"jsonMockResp" text NOT NULL,
	"jobPosition" varchar NOT NULL,
	"jobDesc" varchar NOT NULL,
	"jobExperience" varchar NOT NULL,
	"createdBy" varchar NOT NULL,
	"createdAt" varchar NOT NULL,
	"mockId" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userAnswer" (
	"id" serial PRIMARY KEY NOT NULL,
	"mockId" varchar NOT NULL,
	"question" varchar NOT NULL,
	"correctAns" text,
	"userAns" text,
	"feedback" text,
	"rating" varchar,
	"userEmail" varchar,
	"createdAt" varchar
);
--> statement-breakpoint
CREATE TABLE "education" (
	"id" serial PRIMARY KEY NOT NULL,
	"resume_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"universityName" text NOT NULL,
	"degree" text NOT NULL,
	"major" text NOT NULL,
	"startDate" text NOT NULL,
	"endDate" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "experience" (
	"id" serial PRIMARY KEY NOT NULL,
	"resume_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"positionTitle" text NOT NULL,
	"companyName" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"startDate" text NOT NULL,
	"endDate" text NOT NULL,
	"workSummary" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "prepInterview" (
	"id" serial PRIMARY KEY NOT NULL,
	"prepId" varchar NOT NULL,
	"jobTitle" varchar NOT NULL,
	"jsonPrepResp" text NOT NULL,
	"createdBy" varchar NOT NULL,
	"createdAt" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resumes" (
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"address" text NOT NULL,
	"jobTitle" text NOT NULL,
	"phone" varchar NOT NULL,
	"email" varchar NOT NULL,
	"summary" text NOT NULL,
	"id" serial NOT NULL,
	"title" text NOT NULL,
	"resume_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_email" text NOT NULL,
	"user_name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"theme_color" varchar(10)
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"resume_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"rating" integer NOT NULL
);
