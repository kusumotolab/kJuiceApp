type Props = {
  border?: string;
  color: string;
  children?: React.ReactNode;
  height?: string;
  onClick: () => void;
  radius?: string;
  width?: string;
  fontColor: string;
  fontSize?: string;
};

function Button({
  border,
  color,
  children,
  height,
  onClick,
  radius,
  width,
  fontColor,
  fontSize,
}: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color,
        border,
        borderRadius: radius,
        height,
        width,
        color: fontColor,
        fontSize: fontSize,
      }}
    >
      {children}
    </button>
  );
}

export { Button };
