import ColumnStatus from './ColumnStatus/ColumnStatus';
import './ColumnView.scss';

export default function ColumnView({ statuses }) {
  return (
    <div className="columnview">
      <div className="columnview-container">
        <div className="columnview-columns">
          {statuses.map((status) => (
            <div key={status} className="column">
              <ColumnStatus status={status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
