import "./ScheduleKey.css";

export default function ScheduleKey() {
  return (
    <div className="schedule-key-full">
      <div className="schedule-key">
        <p>
          <div className="green-box">✏️</div>Available
        </p>
        <p>
          <div className="red-box">❌</div>Unavailable
        </p>
      </div>
    </div>
  );
}
