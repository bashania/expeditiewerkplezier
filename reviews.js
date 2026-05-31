/* Expeditie Werkplezier – Ervaringen: volledige reviewmuur met inklapbare verhalen.
   Gebruikt de echte REVIEWS uit data.jsx en ReviewAvatar uit sections.jsx. */
const { useState: useStRv } = React;

function ReviewCard({ r }) {
  const [open, setOpen] = useStRv(false);
  const hasFull = r.full && r.full.length;
  return (
    <figure className={"ewk-rev" + (open ? " is-open" : "")}>
      <span className="ewk-rev__mark"><Icon name="quote" /></span>
      <div className="ewk-stars">{[0, 1, 2, 3, 4].map((k) => <Icon key={k} name="star" />)}</div>
      <blockquote className="ewk-rev__quote">{r.quote}</blockquote>
      {hasFull && open && (
        <div className="ewk-rev__full">
          {r.full.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      )}
      <figcaption className="ewk-rev__foot">
        <ReviewAvatar r={r} />
        <span className="ewk-rev__who"><b>{r.name}</b>{r.role ? <React.Fragment><br />{r.role}</React.Fragment> : null}</span>
      </figcaption>
      {hasFull && (
        <button className="ewk-rev__more" onClick={() => setOpen(!open)}>
          {open ? "Lees minder" : "Lees het hele verhaal"}
          <Icon name={open ? "chevron-up" : "chevron-down"} />
        </button>
      )}
    </figure>
  );
}

function ReviewWall({ items }) {
  return (
    <div className="ewk-revwall">
      {items.map((r) => <ReviewCard key={r.id} r={r} />)}
    </div>
  );
}

Object.assign(window, { ReviewCard, ReviewWall });
