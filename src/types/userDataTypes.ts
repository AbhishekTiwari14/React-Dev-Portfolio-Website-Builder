import * as z from "zod"

export const personalInfoSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(2, "Description must be at least 10 characters"),
  about: z.string().superRefine((text, ctx) => {
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length
    if (wordCount < 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 100,
        type: "string",
        inclusive: true,
        message: "Summary must be at least 100 words long.",
      })
    }
    if (wordCount > 120) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_big,
        maximum: 120,
        type: "string",
        inclusive: true,
        message: "Summary must be at most 120 words long.",
      })
    }
  }),
})

export const socialMediaLinksSchema = z.object({
  Github: z.string().min(1, "You must add your github link"),
  LinkedIn: z.string(),
  Gmail: z.string().email(),
  Technologies: z.array(z.string()).default([]),
})

export const experienceInfoSchema = z.object({
  experiences: z.array(
    z.object({
      fromYear: z.string().min(1, "Start Year Missing"),
      toYear: z.string().min(1, "End Year Missing"),
      designation: z.string().min(1, "Designation Missing"),
      company: z.string().min(1, "Company Missing"),
      workSummary: z.string().min(1, "Work Summary Missing"),
    })
  ),
})

export const projectsInfoSchema = z.object({
  projects: z.array(
    z.object({
      title: z.string().min(1, "Title Missing"),
      description: z.string().min(1, "Description Missing"),
    })
  ),
})

export const userDataSchema = z.object({
  ...personalInfoSchema.shape,
  ...socialMediaLinksSchema.shape,
  ...experienceInfoSchema.shape,
  ...projectsInfoSchema.shape,
})

export type Data = z.infer<typeof userDataSchema>
export type PersonalInfoData = z.infer<typeof personalInfoSchema>
export type socialMediaLinksData = z.infer<typeof socialMediaLinksSchema>
export type ExperienceInfoData = z.infer<typeof experienceInfoSchema>
export type ProjectsInfoData = z.infer<typeof projectsInfoSchema>

export const technologiesList = [
  { value: "html", label: "HTML", category: "Frontend" },
  { value: "css", label: "CSS", category: "Frontend" },
  { value: "javascript", label: "JavaScript", category: "Frontend" },
  { value: "typescript", label: "TypeScript", category: "Frontend" },
  { value: "react", label: "React", category: "Frontend" },
  { value: "vue", label: "Vue.js", category: "Frontend" },
  { value: "angular", label: "Angular", category: "Frontend" },
  { value: "nextjs", label: "Next.js", category: "Frontend" },
  { value: "tailwind", label: "Tailwind CSS", category: "Frontend" },
  { value: "svelte", label: "Svelte", category: "Frontend" },
  { value: "remix", label: "Remix", category: "Frontend" },
  { value: "gatsby", label: "Gatsby", category: "Frontend" },
  { value: "sass", label: "Sass/SCSS", category: "Frontend" },
  {
    value: "styled-components",
    label: "Styled Components",
    category: "Frontend",
  },
  { value: "jquery", label: "jQuery", category: "Frontend" },
  { value: "bootstrap", label: "Bootstrap", category: "Frontend" },
  { value: "d3js", label: "D3.js", category: "Frontend" },
  { value: "threejs", label: "Three.js", category: "Frontend" },
  { value: "webgl", label: "WebGL", category: "Frontend" },
  { value: "pwa", label: "Progressive Web Apps", category: "Frontend" },
  { value: "nodejs", label: "Node.js", category: "Backend" },
  { value: "python", label: "Python", category: "Backend" },
  { value: "java", label: "Java", category: "Backend" },
  { value: "csharp", label: "C#", category: "Backend" },
  { value: "golang", label: "Go", category: "Backend" },
  { value: "rust", label: "Rust", category: "Backend" },
  { value: "express", label: "Express.js", category: "Backend" },
  { value: "django", label: "Django", category: "Backend" },
  { value: "flask", label: "Flask", category: "Backend" },
  { value: "fastapi", label: "FastAPI", category: "Backend" },
  { value: "spring", label: "Spring Boot", category: "Backend" },
  { value: "laravel", label: "Laravel", category: "Backend" },
  { value: "dotnet", label: ".NET", category: "Backend" },
  { value: "ruby", label: "Ruby", category: "Backend" },
  { value: "rails", label: "Ruby on Rails", category: "Backend" },
  { value: "php", label: "PHP", category: "Backend" },
  { value: "graphql", label: "GraphQL", category: "Backend" },
  { value: "grpc", label: "gRPC", category: "Backend" },
  { value: "restapi", label: "REST API", category: "Backend" },
  { value: "socketio", label: "Socket.IO", category: "Backend" },
  { value: "postgresql", label: "PostgreSQL", category: "Database" },
  { value: "mongodb", label: "MongoDB", category: "Database" },
  { value: "mysql", label: "MySQL", category: "Database" },
  { value: "redis", label: "Redis", category: "Database" },
  { value: "elasticsearch", label: "Elasticsearch", category: "Database" },
  { value: "dynamodb", label: "DynamoDB", category: "Database" },
  { value: "neo4j", label: "Neo4j", category: "Database" },
  { value: "cassandra", label: "Cassandra", category: "Database" },
  { value: "sqlite", label: "SQLite", category: "Database" },
  { value: "oracle", label: "Oracle", category: "Database" },
  { value: "mssql", label: "MS SQL Server", category: "Database" },
  { value: "supabase", label: "Supabase", category: "Database" },
  { value: "firebase", label: "Firebase", category: "Database" },
  { value: "cockroachdb", label: "CockroachDB", category: "Database" },
  { value: "couchdb", label: "CouchDB", category: "Database" },
  { value: "tensorflow", label: "TensorFlow", category: "AI/ML" },
  { value: "pytorch", label: "PyTorch", category: "AI/ML" },
  { value: "scikit-learn", label: "scikit-learn", category: "AI/ML" },
  { value: "opencv", label: "OpenCV", category: "AI/ML" },
  { value: "keras", label: "Keras", category: "AI/ML" },
  { value: "huggingface", label: "Hugging Face", category: "AI/ML" },
  { value: "langchain", label: "LangChain", category: "AI/ML" },
  { value: "pandas", label: "Pandas", category: "AI/ML" },
  { value: "numpy", label: "NumPy", category: "AI/ML" },
  { value: "ray", label: "Ray", category: "AI/ML" },
  { value: "mlflow", label: "MLflow", category: "AI/ML" },
  { value: "onnx", label: "ONNX", category: "AI/ML" },
  { value: "aws", label: "AWS", category: "Cloud" },
  { value: "azure", label: "Azure", category: "Cloud" },
  { value: "gcp", label: "Google Cloud", category: "Cloud" },
  { value: "docker", label: "Docker", category: "Cloud" },
  { value: "kubernetes", label: "Kubernetes", category: "Cloud" },
  { value: "terraform", label: "Terraform", category: "Cloud" },
  { value: "ansible", label: "Ansible", category: "Cloud" },
  { value: "jenkins", label: "Jenkins", category: "Cloud" },
  { value: "github-actions", label: "GitHub Actions", category: "Cloud" },
  { value: "serverless", label: "Serverless", category: "Cloud" },
  { value: "cloudflare", label: "Cloudflare", category: "Cloud" },
  { value: "prometheus", label: "Prometheus", category: "Cloud" },
  { value: "grafana", label: "Grafana", category: "Cloud" },
  { value: "pulumi", label: "Pulumi", category: "Cloud" },
  { value: "vagrant", label: "Vagrant", category: "Cloud" },
]
