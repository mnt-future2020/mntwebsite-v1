"use client";

/**
 * The shared spam honeypot: a field that is off-screen for people and
 * irresistible to anything filling inputs by name. Server side, any value here
 * marks the submission as a bot — see lib/antispam.ts. Don't rename the `name`
 * attribute without changing that file too.
 *
 * Deliberately NOT `aria-hidden`. The wrapper used to carry `aria-hidden="true"`
 * around a real <input>, which is the axe `aria-hidden-focus` violation
 * ("ARIA hidden element must not be focusable or contain focusable elements") —
 * and because this renders inside the footer newsletter, it fired on every page
 * of the site. Hiding a focusable control from the accessibility tree while
 * leaving it in the DOM is the failure mode the rule exists to catch: a screen
 * reader lands on a control it has been told does not exist.
 *
 * The accessible honeypot instead stays in the tree and says what it is. It is
 * out of the tab order (`tabIndex={-1}`) so no keyboard user reaches it by
 * tabbing, and a screen-reader user who does reach it in browse mode is told to
 * leave it blank. Bots gain nothing: they fill by name, not by label.
 */
export default function Honeypot({
  id,
  value,
  onChange,
}: {
  /** Unique per form: two forms on one page must not share an input id. */
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor={id}>Leave this field empty</label>
      <input
        id={id}
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
