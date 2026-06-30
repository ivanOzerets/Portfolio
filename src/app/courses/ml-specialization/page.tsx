import CoursePage from "@/app/components/course-page";
import type { Course } from "@/app/components/course-page";

const COURSES: Course[] = [
    {
        title: "Course 1: Supervised Machine Learning — Regression and Classification",
        weeks: [
            { title: "Week 1: Introduction to Machine Learning", file: "c1/week1.md" },
            { title: "Week 2: Regression with Multiple Input Variables", file: "c1/week2.md" },
            { title: "Week 3: Classification", file: "c1/week3.md" },
        ],
    },
    {
        title: "Course 2: Advanced Learning Algorithms",
        weeks: [
            {
                title: "Week 1: Neural Networks",
                file: "c2/week1.md",
                labs: [
                    { title: "Optional Lab — Neurons and Layers", file: "c2/week1-lab-neurons-and-layers.md" },
                    { title: "Optional Lab — Simple Neural Network", file: "c2/week1-lab-simple-neural-network.md" },
                    { title: "Optional Lab — Simple NN", file: "c2/week1-lab-simple-nn.md" },
                    { title: "Practice Lab — NN for Handwritten Digit Recognition", file: "c2/week1-practice-lab.md" },
                ],
            },
            {
                title: "Week 2: NN Training",
                file: "c2/week2.md",
                labs: [
                    { title: "Optional Lab — ReLU Activation", file: "c2/week2-lab-relu-activation.md" },
                    { title: "Optional Lab — Softmax Function", file: "c2/week2-lab-softmax-function.md" },
                    { title: "Optional Lab — Multi-Class Classification", file: "c2/week2-lab-multi-class-classification.md" },
                    { title: "Optional Lab — Derivatives", file: "c2/week2-lab-derivatives.md" },
                    { title: "Optional Lab — Back Propagation", file: "c2/week2-lab-back-propagation.md" },
                    { title: "Practice Lab — NN for Handwritten Digit Recognition, Multiclass", file: "c2/week2-practice-lab.md" },
                ],
            },
            {
                title: "Week 3: Advice for Applying Machine Learning",
                file: "c2/week3.md",
                labs: [
                    { title: "Optional Lab — Diagnosing Bias and Variance", file: "c2/week3-lab-diagnosing-bias-and-variance.md" },
                    { title: "Optional Lab — Model Evaluation and Selection", file: "c2/week3-lab-model-evaluation-and-selection.md" },
                    { title: "Practice Lab — Advice for Applying Machine Learning", file: "c2/week3-practice-lab.md" },
                ],
            },
            {
                title: "Week 4: Decision Trees",
                file: "c2/week4.md",
                labs: [
                    { title: "Optional Lab — Decision Trees", file: "c2/week4-lab-decision-trees.md" },
                    { title: "Optional Lab — Trees Ensembles", file: "c2/week4-lab-trees-ensembles.md" },
                    { title: "Practice Lab — Decision Trees", file: "c2/week4-practice-lab.md" },
                ],
            },
        ],
    },
    {
        title: "Course 3: Unsupervised Learning, Recommenders, Reinforcement Learning",
        weeks: [
            {
                title: "Week 1: Unsupervised Learning",
                file: "c3/week1.md",
                labs: [
                    { title: "Practice Lab — K-Means Clustering", file: "c3/week1-practice-lab-k-means.md" },
                    { title: "Practice Lab — Anomaly Detection", file: "c3/week1-practice-lab-anomaly-detection.md" },
                ],
            },
            {
                title: "Week 2: Recommender Systems",
                file: "c3/week2.md",
                labs: [
                    { title: "Practice Lab — Collaborative Filtering Recommender System", file: "c3/week2-practice-lab-collaborative-filtering.md" },
                    { title: "Practice Lab — Deep Learning for Content-Based Filtering", file: "c3/week2-practice-lab-content-based-filtering.md" },
                    { title: "Optional Lab — PCA and Data Visualization", file: "c3/week2-lab-pca.md" },
                ],
            },
            {
                title: "Week 3: Reinforcement Learning",
                file: "c3/week3.md",
                labs: [
                    { title: "Optional Lab — State-Action Value Function Example", file: "c3/week3-lab-state-action-value.md" },
                    { title: "Practice Lab — Reinforcement Learning", file: "c3/week3-practice-lab.md" },
                ],
            },
        ],
    },
];

export default function MLSpecializationPage() {
    return (
        <CoursePage
            title="Machine Learning Specialization"
            provider="Coursera · DeepLearning.AI"
            courses={COURSES}
            basePath="/notes/courses/ml-specialization/"
        />
    );
}
