import "./Toggle.css";

type Props = {
  toggled: boolean;
  onClick: (activity: boolean) => Promise<void>;
};

export function Toggle({ toggled, onClick }: Props) {
  function callback() {
    onClick(!toggled);
  }

  return (
    <span className="Toggle">
      <label>
        <input type="checkbox" defaultChecked={toggled} onClick={callback} />
        <span />
      </label>
    </span>
  );
}
