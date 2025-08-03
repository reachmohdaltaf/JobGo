"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.user.upsert({
                        where: { email: "employer@example.com" },
                        update: {},
                        create: {
                            name: "Mock Employer",
                            email: "employer@example.com",
                            password: "hashed-password", // Ideally hash if you're using auth
                            role: "EMPLOYER",
                        },
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, prisma.job.createMany({
                            data: [
                                {
                                    job_title: "Frontend Developer",
                                    employer_name: "Pixidux",
                                    job_description: "Join our team to build responsive and interactive user interfaces using React, Tailwind CSS, and modern design patterns. You'll collaborate with designers and backend engineers to create seamless UI experiences.",
                                    job_location: "Remote",
                                    job_employment_type_text: "Full-time",
                                    job_posted_human_readable: "1 day ago",
                                    postedById: user.id,
                                },
                                {
                                    job_title: "Backend Engineer",
                                    employer_name: "Devify Corp",
                                    job_description: "We're looking for a skilled backend developer to design and build APIs using Node.js, Express, and MongoDB. You will also be responsible for integrating third-party services and optimizing performance.",
                                    job_location: "Bangalore",
                                    job_employment_type_text: "Full-time",
                                    job_posted_human_readable: "2 days ago",
                                    postedById: user.id,
                                },
                                {
                                    job_title: "Full Stack Developer",
                                    employer_name: "CodeCraft",
                                    job_description: "As a full stack developer, you will take ownership of end-to-end features from frontend design in React to backend logic in Node.js and database integration in MongoDB. Experience with Git and CI/CD pipelines is preferred.",
                                    job_location: "Delhi",
                                    job_employment_type_text: "Full-time",
                                    job_posted_human_readable: "3 days ago",
                                    postedById: user.id,
                                },
                                {
                                    job_title: "UI/UX Designer",
                                    employer_name: "DesignWave",
                                    job_description: "We're looking for a creative UI/UX designer to create modern, user-friendly interfaces. You should have a solid understanding of user-centered design principles and tools like Figma, Adobe XD, and prototyping tools.",
                                    job_location: "Mumbai",
                                    job_employment_type_text: "Part-time",
                                    job_posted_human_readable: "4 days ago",
                                    postedById: user.id,
                                },
                                {
                                    job_title: "DevOps Engineer",
                                    employer_name: "Cloudly",
                                    job_description: "Manage our cloud infrastructure using AWS, Docker, and Kubernetes. Set up CI/CD pipelines and monitor system health, reliability, and performance to ensure 99.99% uptime.",
                                    job_location: "Remote",
                                    job_employment_type_text: "Full-time",
                                    job_posted_human_readable: "5 days ago",
                                    postedById: user.id,
                                },
                                {
                                    job_title: "Data Analyst",
                                    employer_name: "Insightlytics",
                                    job_description: "Analyze large datasets to discover trends and patterns. Work with business teams to deliver actionable insights using SQL, Python, and visualization tools like Tableau or Power BI.",
                                    job_location: "Hyderabad",
                                    job_employment_type_text: "Contract",
                                    job_posted_human_readable: "6 days ago",
                                    postedById: user.id,
                                },
                                {
                                    job_title: "Mobile App Developer",
                                    employer_name: "AppForge",
                                    job_description: "Build cross-platform mobile applications using React Native. You will be responsible for optimizing performance, ensuring responsiveness, and deploying apps to both iOS and Android stores.",
                                    job_location: "Chennai",
                                    job_employment_type_text: "Full-time",
                                    job_posted_human_readable: "1 week ago",
                                    postedById: user.id,
                                },
                                {
                                    job_title: "Machine Learning Engineer",
                                    employer_name: "NeuronTech",
                                    job_description: "Develop and deploy machine learning models for real-world applications. Must have strong Python skills, experience with TensorFlow/PyTorch, and a deep understanding of ML/DL concepts.",
                                    job_location: "Remote",
                                    job_employment_type_text: "Full-time",
                                    job_posted_human_readable: "8 days ago",
                                    postedById: user.id,
                                }
                            ],
                        })];
                case 2:
                    _a.sent();
                    console.log("✅ Seeding complete!");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
