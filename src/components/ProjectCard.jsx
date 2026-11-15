// S31 challenge 2 (Malaka, approved 2026-11-15): a project as a card. Not used yet: every project in the
// prototype port renders inside the address-bar window, the other-projects list or the reduced-motion list,
// none of which shows a tagline and a separate link, so using it there would change the approved design.
export default function ProjectCard({ project }) {
  return (
    <div className="pcard">
      <img className="ph" src={project.image} alt={project.title} />
      <h3 className="d">{project.title}</h3>
      <p>{project.tagline}</p>
      <a className="go" href={project.url}>
        View Project
      </a>
    </div>
  );
}
