// MIT-WPU Teacher Feedback System — Question Bank
// 3 Sets × 5 Questions each — All original, inspired by PDF structure

const QUESTIONS = {
  "Operating System": {
    set1: [
      {
        text: "How effectively does the teacher break down complex OS concepts like process scheduling and memory management into understandable segments?",
        options: [
          "Exceptional — always uses relatable analogies and live examples",
          "Good — explanations are mostly clear with minor gaps",
          "Moderate — some concepts remain unclear after explanation",
          "Needs work — lectures are hard to follow consistently"
        ]
      },
      {
        text: "How well does the teacher bridge OS theory and real-world scenarios such as deadlock prevention or virtual memory?",
        options: [
          "Always connects every concept to practical usage",
          "Frequently makes the theory-to-practice link",
          "Occasionally connects theory to real scenarios",
          "Rarely provides practical context for concepts"
        ]
      },
      {
        text: "How consistently does the teacher cover the OS syllabus on schedule without rushing or leaving topics incomplete?",
        options: [
          "Systematic and complete — nothing is skipped",
          "Mostly on track with minor timing adjustments",
          "Occasionally rushes through topics near exams",
          "Frequently struggles to complete the syllabus on time"
        ]
      },
      {
        text: "How open and encouraging is the teacher when students ask questions or seek clarifications in OS class?",
        options: [
          "Extremely welcoming — questions are invited at any time",
          "Generally encouraging — most questions get answered",
          "Neutral — does not actively encourage or discourage queries",
          "Discouraging — students feel hesitant to ask questions"
        ]
      },
      {
        text: "How effectively does the teacher use visual tools like diagrams or animations to explain CPU scheduling or page replacement algorithms?",
        options: [
          "Consistently uses high-quality visuals that enhance understanding",
          "Uses visuals for most complex topics",
          "Occasionally uses diagrams but relies mainly on verbal explanation",
          "Rarely or never uses visual aids in lectures"
        ]
      }
    ],
    set2: [
      {
        text: "How approachable and patient does the teacher appear when students are struggling with difficult OS topics?",
        options: [
          "Very approachable — always takes time to help every student",
          "Generally accessible with a calm demeanor",
          "Sometimes seems impatient or preoccupied",
          "Often appears dismissive or unapproachable"
        ]
      },
      {
        text: "How confident and commanding is the teacher's presence while delivering OS lectures?",
        options: [
          "Highly confident — commands the room naturally",
          "Confident in most situations with occasional hesitation",
          "Somewhat uncertain during complex explanations",
          "Frequently appears unsure, affecting class credibility"
        ]
      },
      {
        text: "How effectively does the teacher maintain eye contact with the class during OS lectures to ensure engagement?",
        options: [
          "Excellent eye contact throughout the session",
          "Maintains eye contact with most of the class",
          "Frequently looks at notes or board instead of students",
          "Rarely makes meaningful eye contact with the audience"
        ]
      },
      {
        text: "How purposefully does the teacher use hand gestures and physical movement to illustrate OS concepts?",
        options: [
          "Uses precise and meaningful gestures to aid explanation",
          "Uses gestures occasionally to emphasize key points",
          "Body language is mostly static with rare gestures",
          "Remains stiff and motionless throughout lectures"
        ]
      },
      {
        text: "How gracefully does the teacher respond when a student identifies an error or contradiction during an OS lecture?",
        options: [
          "Acknowledges immediately and turns it into a learning moment",
          "Accepts the correction after a brief pause",
          "Becomes slightly defensive before accepting",
          "Dismisses or ignores student corrections"
        ]
      }
    ],
    set3: [
      {
        text: "How transparent and fair is the teacher when evaluating OS assignments and internal tests?",
        options: [
          "Fully transparent — evaluation criteria shared in advance",
          "Mostly fair with clear criteria most of the time",
          "Evaluation process feels somewhat inconsistent",
          "Assessment feels unclear or unfair"
        ]
      },
      {
        text: "How promptly does the teacher return graded OS assignments with constructive feedback?",
        options: [
          "Returned within a week with detailed comments",
          "Returned within two weeks consistently",
          "Takes over a month for most assignments",
          "Graded work is rarely returned to students"
        ]
      },
      {
        text: "How accessible is the teacher for individual doubt-clearing outside of regular OS lecture hours?",
        options: [
          "Always available and actively helpful beyond class hours",
          "Available most of the time when approached",
          "Rarely available for one-on-one support",
          "Essentially inaccessible outside class time"
        ]
      },
      {
        text: "How regularly does the teacher recap and reinforce previous OS topics before introducing new ones?",
        options: [
          "Always starts with a recap linking old and new concepts",
          "Usually provides a brief review before moving ahead",
          "Occasionally revisits past material when needed",
          "Moves forward without any review of previous content"
        ]
      },
      {
        text: "How effectively does the teacher integrate previous exam questions into OS teaching to help students prepare?",
        options: [
          "Regularly discusses past questions and expected patterns",
          "Occasionally refers to previous papers for context",
          "Rarely incorporates past exam material",
          "Never references previous exams in any session"
        ]
      }
    ]
  },

  "Computer Networks": {
    set1: [
      {
        text: "How clearly does the teacher explain layered networking models like OSI and TCP/IP, ensuring each layer's role is well understood?",
        options: [
          "Breaks down each layer with precision and examples",
          "Mostly clear with a few gaps in certain layers",
          "Explanation is sometimes inconsistent or confusing",
          "Very hard to follow during layer-wise discussions"
        ]
      },
      {
        text: "How effectively does the teacher teach protocol-level mechanics such as TCP three-way handshake or OSPF routing?",
        options: [
          "Step-by-step breakdown of every protocol detail",
          "Covers key protocol steps with minor omissions",
          "Explains high-level flow but skips technical depth",
          "Protocol-level details are largely missing from lectures"
        ]
      },
      {
        text: "How frequently does the teacher connect networking concepts to real-world internet services and applications?",
        options: [
          "Every concept is linked to a practical internet scenario",
          "Real-world links are made for most major topics",
          "Occasionally provides a practical example",
          "Networking topics are taught in an abstract, disconnected way"
        ]
      },
      {
        text: "How thoroughly does the teacher walk through numerical problems such as subnetting or Dijkstra's algorithm during lectures?",
        options: [
          "Every step is explained clearly with reasoning",
          "Solves problems with minor steps skipped",
          "Rushes through calculations without full explanation",
          "Avoids or skips numerical problems in class"
        ]
      },
      {
        text: "How well does the teacher manage the pace of networking lectures to allow note-taking and understanding?",
        options: [
          "Ideal pace — perfectly timed for both learning and notes",
          "Slightly fast but students can generally keep up",
          "Too fast for comfortable note-taking or comprehension",
          "Extremely rushed, making it difficult to follow the content"
        ]
      }
    ],
    set2: [
      {
        text: "How genuinely passionate and enthusiastic does the teacher appear when teaching Computer Networks topics?",
        options: [
          "Radiates authentic passion that energizes the class",
          "Shows enthusiasm especially for core networking topics",
          "Enthusiasm appears intermittent across sessions",
          "Lectures feel flat or unmotivated throughout"
        ]
      },
      {
        text: "How clearly and consistently does the teacher project their voice so all students, including back rows, can hear?",
        options: [
          "Crystal clear voice projection throughout the session",
          "Mostly audible with rare moments of low volume",
          "Sometimes too soft for back rows to hear clearly",
          "Frequently inaudible for students not in front rows"
        ]
      },
      {
        text: "How effectively does the teacher manage classroom distractions and maintain focus during CN lectures?",
        options: [
          "Handles distractions with authority and without disruption",
          "Generally manages the class environment well",
          "Struggles at times to maintain classroom focus",
          "Distractions are frequently ignored or unaddressed"
        ]
      },
      {
        text: "How welcoming and positive is the teacher's facial expression when students ask questions in CN class?",
        options: [
          "Always smiles, acknowledges, and makes students feel heard",
          "Expression is generally warm and inviting",
          "Facial expression remains mostly neutral or unreadable",
          "Students feel unwelcome asking questions due to the teacher's expression"
        ]
      },
      {
        text: "How actively does the teacher move around the classroom to engage students seated in different areas?",
        options: [
          "Moves purposefully throughout the room to maintain engagement",
          "Walks around occasionally during key explanations",
          "Mostly stays near the board or front of the room",
          "Remains stationary at one spot for the entire session"
        ]
      }
    ],
    set3: [
      {
        text: "How effectively does the teacher incorporate online tools, simulators, or video resources to enrich CN learning?",
        options: [
          "Regularly shares simulations, tools, and video references",
          "Sometimes shares useful supplementary links or tools",
          "Rarely suggests digital resources beyond textbooks",
          "No digital resources are ever recommended"
        ]
      },
      {
        text: "How well does the teacher support students who struggle with mathematical aspects of networking like CIDR or error detection?",
        options: [
          "Proactively identifies struggling students and provides extra help",
          "Assists students when they specifically ask for help",
          "Occasionally acknowledges difficulty but rarely follows through",
          "No differentiated support is offered for weaker students"
        ]
      },
      {
        text: "How clearly does the teacher communicate the marking scheme for CN practicals and lab evaluations?",
        options: [
          "Full marking rubric shared in advance before every practical",
          "Explains evaluation criteria just before assessments",
          "Marking scheme is only revealed after grading is done",
          "No marking criteria or scheme is ever communicated"
        ]
      },
      {
        text: "How actively does the teacher encourage students to explore networking topics and certifications beyond the syllabus?",
        options: [
          "Actively promotes extra learning with specific resources",
          "Occasionally suggests beyond-syllabus exploration",
          "Rarely goes beyond the defined course content",
          "Strictly limits all discussions to syllabus content"
        ]
      },
      {
        text: "How effectively does the teacher use quick quizzes or in-class assessments to gauge CN understanding?",
        options: [
          "Regular short quizzes are integrated into most sessions",
          "Conducts occasional surprise tests to check comprehension",
          "Quizzes or tests happen very rarely during the semester",
          "No form of in-class assessment is ever used"
        ]
      }
    ]
  },

  "Python Programming": {
    set1: [
      {
        text: "How effectively does the teacher introduce Python syntax and foundational concepts to ensure all learners are on board?",
        options: [
          "Uses live coding from scratch to demonstrate every concept",
          "Clear verbal explanation with illustrated examples",
          "Explanation is partially unclear for beginners",
          "Introduction to Python basics is confusing for most students"
        ]
      },
      {
        text: "How well does the teacher cover Python data structures like lists, tuples, dictionaries, and sets in class?",
        options: [
          "Thorough coverage with hands-on exercises and edge cases",
          "Clear theoretical explanation with practical examples",
          "Partially covers data structures without depth",
          "Very surface-level treatment of data structures"
        ]
      },
      {
        text: "How consistently does the teacher run and explain live Python programs during lectures?",
        options: [
          "Live coding with real-time execution and commentary",
          "Shows pre-written code and explains it systematically",
          "Occasionally demonstrates code but mostly uses slides",
          "No code demonstrations are done during lectures"
        ]
      },
      {
        text: "How effectively does the teacher teach Python debugging strategies and exception handling techniques?",
        options: [
          "Treats debugging as a core skill with dedicated practice",
          "Covers exception handling with basic examples",
          "Only explains syntax errors, not logical or runtime ones",
          "Error handling and debugging are never addressed"
        ]
      },
      {
        text: "How well does the teacher connect Python programming lessons to real projects, use cases, or industry applications?",
        options: [
          "Consistently ties every lesson to a mini-project or application",
          "Occasionally relates topics to practical usage scenarios",
          "Rarely links programming exercises to real-world projects",
          "No real-world context is ever provided in Python class"
        ]
      }
    ],
    set2: [
      {
        text: "How high-energy and interactive is the teacher's delivery during Python lab and coding sessions?",
        options: [
          "Highly energetic and consistently keeps students engaged",
          "Reasonably engaging with a good overall energy level",
          "Energy and engagement vary significantly by session",
          "Sessions typically feel low-energy and passive"
        ]
      },
      {
        text: "How constructively and patiently does the teacher respond when students make coding mistakes in Python class?",
        options: [
          "Always encourages, turns mistakes into teaching moments",
          "Usually handles errors with patience and positivity",
          "Sometimes shows mild impatience with repeated mistakes",
          "Often responds negatively or dismissively to errors"
        ]
      },
      {
        text: "How naturally does the teacher use appropriate humor to create a lighter, more engaging Python learning environment?",
        options: [
          "Uses humor effortlessly to make sessions enjoyable",
          "Lightens the mood occasionally with timely jokes",
          "Rarely incorporates humor into the learning environment",
          "Sessions are consistently serious with no levity"
        ]
      },
      {
        text: "How attentive and present is the teacher's body language when students raise doubts or ask questions in Python?",
        options: [
          "Fully attentive — faces student, nods, and acknowledges",
          "Mostly attentive with good listening posture",
          "Sometimes distracted or multitasking while listening",
          "Often dismissive or visibly uninterested in questions"
        ]
      },
      {
        text: "How much does the teacher's physical presence and energy influence the overall focus of the Python class?",
        options: [
          "Strong presence keeps the entire class focused and alert",
          "Generally maintains student engagement and attention",
          "Has limited effect on overall class focus or energy",
          "Class tends to lose focus due to low teacher presence"
        ]
      }
    ],
    set3: [
      {
        text: "How proactively does the teacher identify and support students who are falling behind in Python programming?",
        options: [
          "Actively identifies struggling students and intervenes",
          "Helps students when they ask for support",
          "Notices difficulties but rarely follows through with help",
          "Struggling students are largely unnoticed or unhelped"
        ]
      },
      {
        text: "How well-designed and skill-building are the Python practice assignments given by the teacher?",
        options: [
          "Progressive problem sets that build skills step by step",
          "Standard problems that cover the syllabus adequately",
          "Assignments are too easy to challenge students meaningfully",
          "Problems feel disconnected from actual learning goals"
        ]
      },
      {
        text: "How comprehensive is the feedback provided by the teacher on Python code — beyond just checking if it runs?",
        options: [
          "Reviews code style, logic, efficiency, and correctness",
          "Primarily focuses on correctness with some logic feedback",
          "Only evaluates whether the program produces correct output",
          "Code feedback is rarely given beyond a pass/fail"
        ]
      },
      {
        text: "How effectively does the teacher use oral questioning or viva-style checks to test deeper Python understanding?",
        options: [
          "Regular oral assessments to check conceptual depth",
          "Occasionally asks verbal questions during sessions",
          "Oral evaluations rarely happen in this class",
          "Only written or automated tests are used for evaluation"
        ]
      },
      {
        text: "How regularly does the teacher suggest Python platforms, libraries, or resources for student self-improvement?",
        options: [
          "Frequently recommends platforms like HackerRank, LeetCode",
          "Occasionally mentions helpful external resources",
          "Rarely guides students to additional platforms or libraries",
          "No external Python resources are ever suggested"
        ]
      }
    ]
  },

  "OOPs using C++": {
    set1: [
      {
        text: "How clearly does the teacher explain core OOP principles like inheritance, encapsulation, and polymorphism with code examples?",
        options: [
          "Crystal clear with well-structured coded examples for each",
          "Mostly clear with some examples for major concepts",
          "Explanation is abstract and sometimes vague",
          "Concepts remain confusing after explanation"
        ]
      },
      {
        text: "How effectively does the teacher highlight the evolution from procedural C to object-oriented C++?",
        options: [
          "Clearly maps C structures to C++ class equivalents",
          "Briefly compares the two paradigms during lectures",
          "Occasionally mentions the transition but with little depth",
          "C and C++ are treated as nearly identical in teaching"
        ]
      },
      {
        text: "How thoroughly does the teacher cover memory management topics such as pointers, constructors, and destructors?",
        options: [
          "Covers memory concepts deeply with hands-on examples",
          "Adequately covers the basics with some practical context",
          "Only partially explains memory-related topics",
          "Memory management topics are consistently skipped"
        ]
      },
      {
        text: "How regularly does the teacher use live code walkthroughs to explain class hierarchies and object relationships?",
        options: [
          "Always performs live walkthroughs with real-time explanations",
          "Uses pre-compiled code examples during most explanations",
          "Explains class design on the whiteboard without code",
          "Code walkthroughs are rare or absent in lectures"
        ]
      },
      {
        text: "How effectively does the teacher identify and address common student misconceptions about OOP in C++?",
        options: [
          "Proactively anticipates and corrects misconceptions early",
          "Addresses errors and confusion when raised by students",
          "Sometimes ignores errors or moves past them quickly",
          "Student mistakes in C++ concepts are rarely corrected"
        ]
      }
    ],
    set2: [
      {
        text: "How much does the teacher's demeanor in class affect the comfort and openness of students in C++ sessions?",
        options: [
          "Creates a safe, supportive, and open learning environment",
          "Generally comfortable atmosphere with mutual respect",
          "Class atmosphere is neutral — neither welcoming nor cold",
          "The environment feels tense or intimidating for many students"
        ]
      },
      {
        text: "How effectively does the teacher position the whiteboard or screen so that all students can see the code clearly?",
        options: [
          "Always ensures content visibility for every student",
          "Positioning is good for most students in typical setups",
          "Some students frequently struggle to see board content",
          "Poor positioning makes it hard for much of the class to see"
        ]
      },
      {
        text: "How intuitively does the teacher use pacing cues and body language to manage C++ lecture transitions?",
        options: [
          "Natural, fluid transitions between topics with clear signals",
          "Pacing is generally well-managed across most sessions",
          "Transitions between topics feel abrupt or inconsistent",
          "Lecture flow is unpredictable and confusing"
        ]
      },
      {
        text: "How perceptibly does the teacher shift their tone and delivery when moving from easy to difficult OOP concepts?",
        options: [
          "Clearly adjusts pace and depth based on concept complexity",
          "Makes some delivery adjustments for harder topics",
          "Delivery tone stays mostly the same regardless of difficulty",
          "Tone is inconsistent and doesn't reflect concept difficulty"
        ]
      },
      {
        text: "How respectfully does the teacher treat students who give incorrect answers to OOP questions?",
        options: [
          "Always turns wrong answers into dignified learning moments",
          "Usually handles incorrect answers with patience",
          "Occasionally makes students feel embarrassed for errors",
          "Wrong answers sometimes lead to student humiliation"
        ]
      }
    ],
    set3: [
      {
        text: "How consistently does the teacher verify student understanding before advancing to the next OOP topic?",
        options: [
          "Always confirms comprehension before moving to new content",
          "Usually checks in with the class before proceeding",
          "Occasionally pauses to check but not consistently",
          "Moves ahead regardless of whether students have understood"
        ]
      },
      {
        text: "How comprehensively does the teacher evaluate OOP assignments beyond just checking if the output is correct?",
        options: [
          "Evaluates design patterns, code quality, logic, and output",
          "Reviews logic and structure alongside the final output",
          "Only checks whether the program runs and produces results",
          "Assignments are barely reviewed in any meaningful way"
        ]
      },
      {
        text: "How actively does the teacher assist during C++ lab sessions when students face compilation errors or bugs?",
        options: [
          "Walks around proactively helping students debug actively",
          "Assists promptly when students raise their hands",
          "Helps occasionally but not systematically during labs",
          "Students are largely expected to debug entirely on their own"
        ]
      },
      {
        text: "How effectively does the teacher bridge knowledge gaps between C concepts students already know and new OOP requirements?",
        options: [
          "Builds a clear bridge from C fundamentals to OOP in C++",
          "Mostly connects known concepts to new OOP requirements",
          "Assumes prior knowledge without building enough context",
          "Prior knowledge gaps are completely unaddressed"
        ]
      },
      {
        text: "How consistently does the teacher incorporate modern C++ practices (C++11/14/17) into the curriculum?",
        options: [
          "Actively covers modern C++ features with examples",
          "Occasionally introduces newer C++ standards",
          "Sticks primarily to older C++ syntax and approaches",
          "Only legacy C++ examples are ever used in class"
        ]
      }
    ]
  },

  "Mini Project": {
    set1: [
      {
        text: "How clearly does the teacher communicate mini project expectations, deliverables, and evaluation criteria?",
        options: [
          "Provides a detailed rubric with milestones and expectations",
          "Explains requirements verbally with reasonable clarity",
          "Requirements are somewhat vague and open to interpretation",
          "No clear expectations or deliverable guidelines are given"
        ]
      },
      {
        text: "How actively does the teacher support students during the project ideation and topic selection phase?",
        options: [
          "Actively facilitates brainstorming and idea refinement",
          "Offers topic suggestions and guidance when asked",
          "Provides minimal direction during ideation sessions",
          "Students are left entirely to navigate ideation alone"
        ]
      },
      {
        text: "How well does the teacher help students connect their mini project work to the subjects they are studying?",
        options: [
          "Always ensures strong cross-subject alignment in projects",
          "Mostly helps students find relevant subject connections",
          "Rarely highlights the link between project and coursework",
          "No academic connection is made to course subjects"
        ]
      },
      {
        text: "How regularly does the teacher review project progress and provide actionable feedback before submission?",
        options: [
          "Gives detailed and timely feedback at each project milestone",
          "Reviews project once at a key stage before final submission",
          "Only reviews the final submission with no interim feedback",
          "No meaningful project reviews take place at any stage"
        ]
      },
      {
        text: "How effectively does the teacher help students develop documentation and technical report-writing skills?",
        options: [
          "Dedicates focused sessions to documentation best practices",
          "Provides a format guide and brief orientation on reports",
          "Mentions documentation expectations in passing only",
          "Documentation skills are never addressed or taught"
        ]
      }
    ],
    set2: [
      {
        text: "How motivating is the teacher's personality when students feel stuck, discouraged, or overwhelmed in their project?",
        options: [
          "Highly motivating — always refocuses and energizes students",
          "Generally encouraging and solution-oriented",
          "Neutral response that neither motivates nor discourages",
          "Teacher's reaction tends to increase student stress"
        ]
      },
      {
        text: "How engaged and genuinely interested does the teacher appear during one-on-one project review sessions?",
        options: [
          "Fully engaged — takes notes, asks thoughtful questions",
          "Shows general interest and attentiveness during reviews",
          "Appears to go through the motions without real engagement",
          "Visibly disinterested or distracted during reviews"
        ]
      },
      {
        text: "How much patience does the teacher demonstrate during detailed or lengthy student project presentations?",
        options: [
          "Listens attentively to full presentations without interrupting",
          "Patient through most of the presentation with rare exception",
          "Occasionally appears impatient with longer presentations",
          "Frequently interrupts or rushes students mid-presentation"
        ]
      },
      {
        text: "How confidently does the teacher guide students when their project domain is unfamiliar to the teacher?",
        options: [
          "Acknowledges limitations honestly and still guides effectively",
          "Mostly confident with slight hesitation in unfamiliar territory",
          "Appears noticeably uncertain in many unfamiliar domains",
          "Visibly uncomfortable and struggles to provide guidance"
        ]
      },
      {
        text: "How effectively does the teacher's professional presence command respect in project review and demo sessions?",
        options: [
          "Commands natural authority and student attention effortlessly",
          "Generally respected and trusted by the student group",
          "Occasionally loses the class's attention during sessions",
          "Struggles to maintain structure or focus during reviews"
        ]
      }
    ],
    set3: [
      {
        text: "How fairly does the teacher evaluate individual contribution versus overall teamwork in group mini projects?",
        options: [
          "Distinguishes and evaluates both individual and team work clearly",
          "Mostly evaluates the team collectively with some individual credit",
          "It is unclear how individual contributions are factored in",
          "No separate individual evaluation takes place"
        ]
      },
      {
        text: "How effectively does the teacher prepare students for presenting and defending their mini project work?",
        options: [
          "Explicitly teaches presentation structure and demo strategy",
          "Provides useful presentation tips before demo day",
          "Minimal guidance on how to present or defend the project",
          "Students receive no preparation support for demos"
        ]
      },
      {
        text: "How fairly does the teacher accommodate students facing technical glitches or late submission issues?",
        options: [
          "Very fair and accommodating with clear, compassionate policies",
          "Generally flexible with a reasonable degree of understanding",
          "Somewhat strict, with limited room for exceptions",
          "Very rigid with no consideration for genuine difficulties"
        ]
      },
      {
        text: "How actively does the teacher reward and celebrate creative or innovative project ideas?",
        options: [
          "Actively highlights and rewards original, creative concepts",
          "Verbally encourages creative thinking and novel approaches",
          "Creative ideas are accepted but not specifically recognized",
          "Defaults to conventional project ideas without encouraging innovation"
        ]
      },
      {
        text: "How clearly does the teacher connect the mini project evaluation to the overall learning outcomes of the course?",
        options: [
          "Explicitly maps project evaluation criteria to learning goals",
          "Generally aligns project assessment with course objectives",
          "Connection between project and learning goals is vague",
          "No visible alignment between project evaluation and course outcomes"
        ]
      }
    ]
  },

  "Project Based Learning": {
    set1: [
      {
        text: "How clearly does the teacher explain the PBL approach, its methodology, and the learning outcomes students are expected to achieve?",
        options: [
          "Provides a thorough orientation including goals and methodology",
          "Explains the core concept of PBL adequately",
          "PBL structure is described vaguely with little clarity",
          "No meaningful introduction to the PBL approach is given"
        ]
      },
      {
        text: "How effectively does the teacher facilitate collaboration and teamwork dynamics during PBL sessions?",
        options: [
          "Actively shapes team dynamics and collaboration strategies",
          "Encourages teamwork and intervenes when teams need support",
          "Leaves groups largely to manage their own collaboration",
          "Group dynamics are completely ignored by the teacher"
        ]
      },
      {
        text: "How well does the teacher integrate contemporary, industry-relevant problems into PBL activities?",
        options: [
          "Consistently uses current, real-world industry challenges",
          "Sometimes brings in relevant and timely problem scenarios",
          "Problems used often feel dated or out of touch",
          "Generic textbook problems are used without industry context"
        ]
      },
      {
        text: "How thoroughly does the teacher provide feedback across different stages of the PBL process?",
        options: [
          "Structured feedback is provided at every milestone stage",
          "Meaningful feedback is given at key points in the process",
          "Only final-stage feedback is typically provided",
          "Feedback across the PBL journey is rare or absent"
        ]
      },
      {
        text: "How actively does the teacher encourage independent research and self-directed learning throughout PBL?",
        options: [
          "Consistently nudges students toward independent exploration",
          "Occasionally suggests resources or research directions",
          "Rarely promotes self-learning or independent investigation",
          "Independent learning is never encouraged or recognized"
        ]
      }
    ],
    set2: [
      {
        text: "How effectively does the teacher's facilitation style create an open, lively discussion culture in PBL sessions?",
        options: [
          "Creates a thriving culture of open and respectful discussion",
          "Encourages discussion in most sessions with good results",
          "Discussion tends to be one-sided or dominated by few voices",
          "PBL sessions are mostly lecture-format with no real discussion"
        ]
      },
      {
        text: "How clearly does the teacher's body language signal openness and receptiveness to diverse student ideas?",
        options: [
          "Open posture, nods actively, and invites all contributions",
          "Generally open and receptive with positive signals",
          "Body language is neutral and difficult to read",
          "Closed body language that may discourage student contributions"
        ]
      },
      {
        text: "How well does the teacher balance authority and friendliness to maintain a productive PBL environment?",
        options: [
          "Strikes a natural and effective balance between both",
          "Leans slightly towards friendliness while maintaining order",
          "Too authoritative, creating unnecessary formality",
          "Too casual, sometimes losing control of the session"
        ]
      },
      {
        text: "How effectively does the teacher mediate disagreements or interpersonal conflicts within project groups?",
        options: [
          "Mediates calmly and restores group harmony effectively",
          "Handles most conflicts with a constructive approach",
          "Struggles at times to resolve group-level disagreements",
          "Avoids intervening in team conflicts entirely"
        ]
      },
      {
        text: "How effectively does the teacher's enthusiasm for PBL transfer into genuine motivation for students?",
        options: [
          "Teacher's passion for PBL is clearly contagious",
          "Students feel moderately energized by the teacher's approach",
          "Teacher enthusiasm has limited effect on student motivation",
          "PBL sessions often feel uninspiring or demotivating"
        ]
      }
    ],
    set3: [
      {
        text: "How thoroughly does the teacher assess the learning process and reflection in PBL, rather than just the final output?",
        options: [
          "Evaluates process documentation, reflection, and output equally",
          "Values the journey alongside the deliverable consistently",
          "Slightly prioritizes the end result over the process",
          "Only the final deliverable is evaluated in any meaningful way"
        ]
      },
      {
        text: "How effectively does the teacher incorporate structured peer evaluation as part of the PBL assessment cycle?",
        options: [
          "Uses formal peer review forms integrated into assessment",
          "Incorporates peer feedback at key checkpoints occasionally",
          "Attempts peer review but implementation is inconsistent",
          "Peer-based evaluation is never used in this subject"
        ]
      },
      {
        text: "How explicitly does the teacher help students connect their PBL experience to career readiness and industry skills?",
        options: [
          "Regularly frames PBL outcomes in terms of career relevance",
          "Occasionally draws parallels between PBL and future careers",
          "Career connections to PBL are rarely if ever mentioned",
          "No link between PBL learning and career skills is established"
        ]
      },
      {
        text: "How sensitively and constructively does the teacher handle underperforming groups without damaging their confidence?",
        options: [
          "Handles underperformance with empathy and targeted support",
          "Mostly constructive with occasional direct but fair feedback",
          "Feedback is sometimes harsh and demotivating",
          "Public or unfiltered criticism that discourages struggling groups"
        ]
      },
      {
        text: "How well does the teacher maintain transparent documentation and communication of PBL expectations with students?",
        options: [
          "Keeps students informed through shared, updated documents",
          "Communicates milestones and expectations verbally at each stage",
          "Documentation and communication are sparse and inconsistent",
          "No shared documentation or structured communication is provided"
        ]
      }
    ]
  }
};

// Subject colors and icons
const SUBJECT_META = {
  "Operating System": { icon: "💻", color: "#EFF6FF", accent: "#3B82F6" },
  "Computer Networks": { icon: "🌐", color: "#F0FDF4", accent: "#10B981" },
  "Python Programming": { icon: "🐍", color: "#FEF9C3", accent: "#F59E0B" },
  "OOPs using C++": { icon: "⚙️", color: "#FFF7ED", accent: "#F97316" },
  "Mini Project": { icon: "🚀", color: "#FDF4FF", accent: "#A855F7" },
  "Project Based Learning": { icon: "📊", color: "#FFF1F2", accent: "#F43F5E" }
};
