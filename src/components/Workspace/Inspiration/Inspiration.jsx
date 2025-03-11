import Quotes from './Quotes/Quotes';
import Paragraph from 'antd/es/typography/Paragraph';
import './Inspiration.scss';

export default function Inspiration() {
  return (
    <>
      <div className="inspiration">
        <div className="inspiration-title">
          <Paragraph>Inspiration</Paragraph>
        </div>
        <Quotes />
      </div>
    </>
  );
}
