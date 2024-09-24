const App = () => {
  const courseName = "Half Stack application development";

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }
  
  interface CoursePartBasic extends CoursePartDescription {
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartSpecial extends CoursePartDescription {
    requirements: string[];
    kind: "special"
  }
  
  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial; 

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  const Header = ({ name }: { name: string }) => (
    <h1>{name}</h1>
  );
  
  const Content = ({ parts }: { parts: CoursePart[] }) => (
    <div>
      {parts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </div>
  );
  
  const Total = ({ total }: { total: number }) => (
    <p>
      Number of exercises {total}
    </p>
  );

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const Part = ({ part }: { part: CoursePart }) => {
    const descrStyle = { marginTop: '0', marginBottom: '4px' };
    switch (part.kind) {
      case "basic":
        return (
          <div>
            <strong>{part.name} {part.exerciseCount}</strong>
            <p style={descrStyle}><em>{part.description}</em></p>
          </div>
        );
      case "group":
        return (
          <div>
            <strong>{part.name} {part.exerciseCount}</strong>
            <p style={descrStyle}>project exercises: {part.groupProjectCount}</p>
          </div>
        );
      case "background":
        return (
          <div>
            <strong>{part.name} {part.exerciseCount}</strong>
            <p style={descrStyle}><em>{part.description}</em></p>
            <p style={descrStyle}>background material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a></p>
          </div>
        );
      case "special":
        return (
          <div>
            <strong>{part.name} {part.exerciseCount}</strong>
            <p style={descrStyle}><em>{part.description}</em></p>
            <p style={descrStyle}>required skills: {part.requirements.join(", ")}</p>
          </div>
        );
      default:
        return assertNever(part);
    }
  };

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;
