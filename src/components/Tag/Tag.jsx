import { Tag as AntTag } from 'antd';

export default function Tag({ label }) {
  const color =
    label === 'high' ? '#ff4d4f' : label === 'medium' ? '#faa538' : '#34b86b';

  if (!label) return null;

  return (
    <AntTag color={color}>
      {label.charAt(0).toUpperCase() + label.slice(1)}
    </AntTag>
  );
}
