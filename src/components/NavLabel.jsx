// Phone: name over "/ section"; wide screens: both on one line (N2).
export default function NavLabel({ section }) {
  return (
    <div className="font-heading text-[length:min(3.75vw,7vh)] leading-[1.1] font-medium tracking-[-0.02em] wide:flex wide:items-baseline wide:gap-[.3em]">
      <p className="max-wide:text-[length:min(7vw,10vh)] max-wide:leading-[.9]">
        Malaka Gonawala
      </p>
      {section && (
        <p className="max-wide:mt-1.5 max-wide:text-[length:clamp(20px,4.7vw,60px)]">
          / {section}
        </p>
      )}
    </div>
  );
}
