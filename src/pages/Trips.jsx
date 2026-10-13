import { useState } from "react";

export default function Trips() {
  const [district, setDistrict] = useState("");
  const [date, setDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!district.trim() || !date || !purpose.trim()) {
      setError("Please complete all fields.");
      return;
    }

    setTrips((previousTrips) => [
      ...previousTrips,
      {
        id: Date.now(),
        district: district.trim(),
        date,
        purpose: purpose.trim(),
      },
    ]);

    setDistrict("");
    setDate("");
    setPurpose("");
    setError("");
  }

  function handleDelete(id) {
    setTrips((previousTrips) =>
      previousTrips.filter((trip) => trip.id !== id)
    );
  }

  return (
    <main className="container">
      <h1>Plan a Club Trip</h1>

      <form onSubmit={handleSubmit} className="trip-form">
        <label htmlFor="tripDistrict">District</label>

        <input
          id="tripDistrict"
          value={district}
          onChange={(event) => setDistrict(event.target.value)}
          placeholder="Enter district"
        />

        <label htmlFor="tripDate">Trip date</label>

        <input
          id="tripDate"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          min={new Date().toLocaleDateString("en-CA")}
        />

        <label htmlFor="tripPurpose">Purpose</label>

        <input
          id="tripPurpose"
          value={purpose}
          onChange={(event) => setPurpose(event.target.value)}
          placeholder="Example: Educational visit"
        />

        <button type="submit">Add Trip</button>
      </form>

      {error && <p className="error">{error}</p>}

      <h2>Planned Trips ({trips.length})</h2>

      {trips.length === 0 && <p>No trips planned yet.</p>}

      {trips.map((trip) => (
        <div className="trip-card" key={trip.id}>
          <h3>{trip.district}</h3>
          <p>Date: {trip.date}</p>
          <p>Purpose: {trip.purpose}</p>

          <button
            type="button"
            className="delete-button"
            onClick={() => handleDelete(trip.id)}
          >
            Remove Trip
          </button>
        </div>
      ))}
    </main>
  );
}