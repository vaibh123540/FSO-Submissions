const Header = (props) => <h2>{props.course}</h2>

const Content = ({parts}) => (
  <div>
    {parts.map(part => <Part key = {part.id} part = {part}/>)}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => sum+=part.exercises, 0)
  return (
    <b>total of {total} exercises</b>
  )
}

const Course = ({course}) => {
  return (
    <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </>
  )
}

export default Course