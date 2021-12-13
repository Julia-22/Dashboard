export default function DetailsTask({task}) {
  return (
    <div className="detailsTask">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
    </div>
  );
}