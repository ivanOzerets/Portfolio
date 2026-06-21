import CoursePage from "@/app/components/course-page";
import type { Course } from "@/app/components/course-page";

const COURSES: Course[] = [
    {
        title: "Course 1: Neural Networks and Deep Learning",
        weeks: [
            {
                title: "Week 1: Introduction to Deep Learning",
                file: "c1/week1.md",
            },
            {
                title: "Week 2: Neural Networks Basics",
                file: "c1/week2.md",
                labs: [
                    { title: "Lab — Python Basics with NumPy", file: "c1/week2-lab-python-basics-with-numpy.md" },
                    { title: "Programming Assignment — Logistic Regression with a Neural Network Mindset", file: "c1/week2-practice-lab.md" },
                ],
            },
            {
                title: "Week 3: Shallow Neural Networks",
                file: "c1/week3.md",
                labs: [
                    { title: "Programming Assignment — Planar Data Classification", file: "c1/week3-practice-lab.md" },
                ],
            },
            {
                title: "Week 4: Deep Neural Networks",
                file: "c1/week4.md",
                labs: [
                    { title: "Lab — Building your Deep NN Step by Step", file: "c1/week4-lab-building-deep-nn.md" },
                    { title: "Programming Assignment — Deep Neural Network Application", file: "c1/week4-practice-lab.md" },
                ],
            },
        ],
    },
    {
        title: "Course 2: Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization",
        weeks: [
            {
                title: "Week 1: Practical Aspects of Deep Learning",
                file: "c2/week1.md",
                labs: [
                    { title: "Programming Assignment — Initialization", file: "c2/week1-practice-lab-initialization.md" },
                    { title: "Programming Assignment — Regularization", file: "c2/week1-practice-lab-regularization.md" },
                    { title: "Programming Assignment — Gradient Checking", file: "c2/week1-practice-lab-gradient-checking.md" },
                ],
            },
            {
                title: "Week 2: Optimization Algorithms",
                file: "c2/week2.md",
                labs: [
                    { title: "Programming Assignment — Optimization Methods", file: "c2/week2-practice-lab-optimization-methods.md" },
                ],
            },
            {
                title: "Week 3: Hyperparameter Tuning, Batch Normalization and Programming Frameworks",
                file: "c2/week3.md",
                labs: [
                    { title: "Programming Assignment — Introduction to TensorFlow", file: "c2/week3-practice-lab-tensorflow.md" },
                ],
            },
        ],
    },
    {
        title: "Course 3: Structuring Machine Learning Projects",
        weeks: [
            { title: "Week 1: ML Strategy", file: "c3/week1.md" },
            { title: "Week 2: ML Strategy", file: "c3/week2.md" },
        ],
    },
    {
        title: "Course 4: Convolutional Neural Networks",
        weeks: [
            { title: "Week 1: Foundations of Convolutional Neural Networks", file: null },
            { title: "Week 2: Deep Convolutional Neural Networks: Case Studies", file: null },
            { title: "Week 3: Object Detection", file: null },
            { title: "Week 4: Special Applications: Face Recognition and Neural Style Transfer", file: null },
        ],
    },
    {
        title: "Course 5: Sequence Models",
        weeks: [
            { title: "Week 1: Recurrent Neural Networks", file: null },
            { title: "Week 2: Natural Language Processing and Word Embeddings", file: null },
            { title: "Week 3: Sequence Models and Attention Mechanism", file: null },
            { title: "Week 4: Transformer Network", file: null },
        ],
    },
];

export default function DeepLearningPage() {
    return (
        <CoursePage
            title="Deep Learning Specialization"
            provider="Coursera · DeepLearning.AI"
            courses={COURSES}
            basePath="/notes/deep-learning-specialization/"
        />
    );
}
