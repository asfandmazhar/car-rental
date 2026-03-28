"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { MdAirlineSeatLegroomExtra } from "react-icons/md";
import { BsSuitcase2Fill } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCurrency } from "@/context/CurrencyContext";

export default function BookingForm() {
  const { convertPrice, symbol } = useCurrency();
  const router = useRouter();
  const [returnTrip, setReturnTrip] = useState(false);
  const [step, setStep] = useState(1);
  const [cars, setCars] = useState<any[]>([]);
  const [carLoading, setCarLoading] = useState(false);
  const [carError, setCarError] = useState("");
  const [selectedCar, setSelectedCar] = useState<any>(null);

  const [passengerData, setPassengerData] = useState({
    fullName: "",
    email: "",
    phone: "",
    childSeat: "no",
    specialRequests: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [dropOffData, setDropOffData] = useState("");
  const [dropOffTime, setDropOffTime] = useState("");
  const [passengerCount, setPassengerCount] = useState(1);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [fromSuggestions, setFromSuggestions] = useState<any[]>([]);
  const [toSuggestions, setToSuggestions] = useState<any[]>([]);
  const [price, setPrice] = useState<number | null>(null);

  // PRODUCTION READY GOOGLE SEARCH
  const searchLocation = async (query: string) => {
    if (query.length < 3) return [];
    try {
      const res = await axios.get(
        `/api/google?type=autocomplete&input=${query}`,
      );
      return res.data;
    } catch (err) {
      return [];
    }
  };

  // PRODUCTION READY GOOGLE DISTANCE
  const getRoadDistance = async (origin: string, destination: string) => {
    try {
      const res = await axios.get(
        `/api/google?type=distance&origin=${origin}&destination=${destination}`,
      );
      const element = res.data.rows[0].elements[0];
      if (element.status === "OK") {
        return element.distance.value / 1000; // Meters to KM
      }
      return null;
    } catch (err) {
      return null;
    }
  };

  const [searchTimeout, setSearchTimeout] = useState<any>(null);

  const handleSearch = (value: string, type: "from" | "to") => {
    if (searchTimeout) clearTimeout(searchTimeout);
    const timeout = setTimeout(async () => {
      const results = await searchLocation(value);
      type === "from" ? setFromSuggestions(results) : setToSuggestions(results);
    }, 300);
    setSearchTimeout(timeout);
  };

  const calculatePriceByCar = (car: any, distance: any) => {
    if (!car || !distance) return null;
    const { category } = car;
    const basePrice =
      distance >= category.start && distance <= category.end
        ? category.price
        : category.price + (distance - category.end) * category.pricePerKM;
    return basePrice;
  };

  const handleNext = async () => {
    if (step === 1) {
      if (!fromValue || !toValue || !dateValue) {
        toast.error("Please fill in all route details.");
        return;
      }
      const dist = await getRoadDistance(fromValue, toValue);
      if (dist === null) {
        toast.error("Could not calculate distance between these points.");
        return;
      }
      setDistanceKm(dist);
    }
    if (step === 2 && !selectedCar) {
      toast.error("Please select a car.");
      return;
    }
    if (step === 3) {
      const { fullName, email, phone } = passengerData;
      if (!fullName || !email || !phone) {
        toast.error("Missing passenger info.");
        return;
      }
    }
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  useEffect(() => {
    if (step === 2) fetchCars();
  }, [step]);

  const fetchCars = async () => {
    setCarLoading(true);
    try {
      const res = await axios.get("/api/public/cars");
      setCars(res.data.data || []);
    } catch (err) {
      setCarError("Failed to load cars");
    } finally {
      setCarLoading(false);
    }
  };

  const handleSetCarPrice = (car: any, distanceKm: any) => {
    setPrice(calculatePriceByCar(car, distanceKm));
    setSelectedCar(car);
  };

  const handleFinalSubmit = async () => {
    const loadingToast = toast.loading("Processing your booking...");

    const bookingPayload = {
      fullName: passengerData.fullName,
      email: passengerData.email,
      phoneNumber: passengerData.phone,
      numOfPassengers: passengerCount,
      carId: selectedCar._id,
      pickUpLocation: fromValue,
      dropOffLocation: toValue,
      pickUpDateAndTime: `${dateValue}T${timeValue}`,
      dropOffDateAndTime: returnTrip ? `${dropOffData}T${dropOffTime}` : null,
      note: passengerData.specialRequests,
      price: price,
      childSeat: passengerData.childSeat,
      paymentMethod: paymentMethod,
    };

    try {
      const res = await axios.post("/api/public/booking", bookingPayload);
      toast.dismiss(loadingToast);
      if (res.data.success) {
        if (paymentMethod === "card" && res.data.url) {
          // Redirecting the user to Stripe's secure checkout page
          window.location.href = res.data.url;
        } else {
          // Cash booking: proceed to your success page
          router.push(`/success?bookingId=${res.data.bookingId}`);
        }
      }
    } catch (error: any) {
      const errorMsg = error.res?.data?.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div className="container container-fluid py-5 min-vh-100">
      <h2 className="fw-bold text-uppercase text-primary">Transfer Booking</h2>
      <hr className="mb-4" />

      <div className="d-flex align-items-center mb-5">
        <Step number="1" title="ROUTE" active={step === 1} />
        <Step number="2" title="VEHICLE" active={step === 2} />
        <Step number="3" title="PASSENGER" active={step === 3} />
        <Step number="4" title="PAYMENT" active={step === 4} />
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 p-4">
            {step === 1 && (
              <>
                <div className="mb-3 position-relative">
                  <label className="form-label fw-bold">Pickup Location</label>
                  <input
                    className="form-control form-control-lg"
                    placeholder="Enter pickup address"
                    value={fromValue}
                    onChange={(e) => {
                      setFromValue(e.target.value);
                      handleSearch(e.target.value, "from");
                    }}
                  />
                  {fromSuggestions.length > 0 && (
                    <div
                      className="list-group position-absolute w-100 shadow-lg"
                      style={{ zIndex: 1000 }}
                    >
                      {fromSuggestions.map((item) => (
                        <button
                          key={item.place_id}
                          className="list-group-item list-group-item-action py-3"
                          onClick={() => {
                            setFromValue(item.description);
                            setFromSuggestions([]);
                          }}
                        >
                          <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                          {item.description}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mb-3 position-relative">
                  <label className="form-label fw-bold">Dropoff Location</label>
                  <input
                    className="form-control form-control-lg"
                    placeholder="Enter destination"
                    value={toValue}
                    onChange={(e) => {
                      setToValue(e.target.value);
                      handleSearch(e.target.value, "to");
                    }}
                  />
                  {toSuggestions.length > 0 && (
                    <div
                      className="list-group position-absolute w-100 shadow-lg"
                      style={{ zIndex: 1000 }}
                    >
                      {toSuggestions.map((item) => (
                        <button
                          key={item.place_id}
                          className="list-group-item list-group-item-action py-3"
                          onClick={() => {
                            setToValue(item.description);
                            setToSuggestions([]);
                          }}
                        >
                          <i className="bi bi-geo-alt-fill me-2 text-danger"></i>
                          {item.description}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={dateValue}
                      onChange={(e) => setDateValue(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={timeValue}
                      onChange={(e) => setTimeValue(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-check form-switch mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={returnTrip}
                    onChange={() => setReturnTrip(!returnTrip)}
                  />

                  <label className="form-check-label fw-bold">
                    Return trip
                  </label>
                </div>

                {returnTrip && (
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <input
                        type="date"
                        className="form-control"
                        value={dropOffData}
                        onChange={(e) => setDropOffData(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="time"
                        className="form-control"
                        value={dropOffTime}
                        onChange={(e) => setDropOffTime(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <button
                  className="btn btn-primary btn-lg w-100 fw-bold"
                  onClick={handleNext}
                >
                  Search Available Vehicles
                </button>
              </>
            )}
            {/* STEP 2: VEHICLE */}
            {step === 2 && (
              <>
                {carLoading ? (
                  <div className="mb-3">Loading cars...</div>
                ) : carError ? (
                  <div className="alert alert-danger">{carError}</div>
                ) : (
                  <div className="row g-3 mb-3">
                    {cars.map((car: any) => (
                      <div
                        key={car._id}
                        className={`card p-3 mb-3 border-2 ${selectedCar?._id === car._id ? "border-primary" : "border-light"}`}
                        onClick={() => handleSetCarPrice(car, distanceKm)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="d-flex align-items-center">
                          <img
                            src={car.images?.[0]}
                            width="120"
                            className="rounded"
                            alt=""
                          />
                          <div className="ms-3 flex-grow-1">
                            <h6 className="mb-0">{car.title}</h6>
                            <small className="text-muted">
                              <MdAirlineSeatLegroomExtra /> {car.seats} Seats |{" "}
                              <BsSuitcase2Fill /> {car.suitcaseCapacity} Bags
                            </small>
                          </div>
                          <div className="text-end">
                            <h5 className="mb-0 text-primary">
                              {symbol}{" "}
                              {convertPrice(
                                calculatePriceByCar(car, distanceKm),
                              )}
                            </h5>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <button
                  className="btn btn-primary w-100 fw-semibold mt-2 mb-2"
                  onClick={handleNext}
                >
                  Next Step
                </button>
                <button
                  className="btn btn-black w-100 fw-semibold"
                  onClick={handleBack}
                >
                  Go Back
                </button>
              </>
            )}

            {/* STEP 3: PASSENGER */}
            {step === 3 && (
              <>
                <div className="row g-3 mb-3">
                  <div className="col-md-12">
                    <input
                      className="form-control mb-2"
                      placeholder="Full Name"
                      value={passengerData.fullName}
                      onChange={(e) =>
                        setPassengerData({
                          ...passengerData,
                          fullName: e.target.value,
                        })
                      }
                    />
                    <input
                      className="form-control mb-2"
                      placeholder="Email"
                      value={passengerData.email}
                      onChange={(e) =>
                        setPassengerData({
                          ...passengerData,
                          email: e.target.value,
                        })
                      }
                    />
                    <input
                      className="form-control mb-2"
                      placeholder="Phone"
                      value={passengerData.phone}
                      onChange={(e) =>
                        setPassengerData({
                          ...passengerData,
                          phone: e.target.value,
                        })
                      }
                    />

                    {/* Child Seat Toggle */}
                    <div className="mb-3">
                      <label className="form-label d-block">Child Seat</label>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className={`btn btn-sm btn-primary ${passengerData.childSeat === "yes" ? "" : "opacity-75"}`}
                          onClick={() =>
                            setPassengerData({
                              ...passengerData,
                              childSeat: "yes",
                            })
                          }
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          className={`btn btn-sm btn-primary ${passengerData.childSeat === "no" ? "" : "opacity-75"}`}
                          onClick={() =>
                            setPassengerData({
                              ...passengerData,
                              childSeat: "no",
                            })
                          }
                        >
                          No
                        </button>
                      </div>
                    </div>

                    <textarea
                      className="form-control"
                      placeholder="Special Requests"
                      value={passengerData.specialRequests}
                      onChange={(e) =>
                        setPassengerData({
                          ...passengerData,
                          specialRequests: e.target.value,
                        })
                      }
                      rows={4}
                    ></textarea>
                  </div>
                </div>

                <button
                  className="btn btn-primary w-100 fw-semibold mb-2"
                  onClick={handleNext}
                >
                  Next Step
                </button>
                <button
                  className="btn btn-black w-100 fw-semibold"
                  onClick={handleBack}
                >
                  Go Back
                </button>
              </>
            )}

            {/* STEP 4: PAYMENT */}
            {step === 4 && (
              <div className="h-100">
                <div
                  className="d-flex gap-3 mb-4"
                  style={{ flexDirection: "column" }}
                >
                  <div className="d-flex flex-column gap-3 mb-4">
                    {/* Cash Payment */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cash")}
                      className={`card p-3 text-start border ${
                        paymentMethod === "cash"
                          ? "border-primary shadow-sm"
                          : "border-gray opacity-75"
                      }`}
                      style={{
                        cursor: "pointer",
                        backgroundColor: "rgb(112, 244, 109, 0.2)",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <p className="mb-1 fw-bold fs-6">Cash payment</p>
                          <span
                            className="text-muted"
                            style={{ fontSize: "0.85rem" }}
                          >
                            Prepayment for car booking 10% by card. The rest is
                            paid in cash to the driver.
                          </span>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            checked={paymentMethod === "cash"}
                            readOnly
                          />
                        </div>
                      </div>
                    </button>

                    {/* Card Payment */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`card p-3 text-start border ${
                        paymentMethod === "card"
                          ? "border-primary shadow-sm"
                          : "border-gray opacity-75"
                      }`}
                      style={{
                        cursor: "pointer",
                        backgroundColor: "rgb(112, 244, 109, 0.2)",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <p className="mb-1 fw-bold fs-6">Card payment</p>
                          <span
                            className="text-muted"
                            style={{ fontSize: "0.85rem" }}
                          >
                            Prepayment for car booking 100% by card.
                          </span>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            checked={paymentMethod === "card"}
                            readOnly
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
                <p className="mb-3">
                  By providing your contact details, you agree with our{" "}
                  <Link href="/term" target="_blank">
                    Terms and conditions
                  </Link>
                  .
                </p>
                {/* Change this in Step 4 */}
                <button
                  className="btn btn-primary w-100"
                  onClick={handleFinalSubmit} // Updated from the toast
                >
                  Confirm & Book Now
                </button>
                <button
                  className="btn btn-black w-100 mt-2"
                  onClick={handleBack}
                >
                  Go Back
                </button>
              </div>
            )}
          </div>
        </div>

        {step === 4 ? (
          <div className="col-lg-6">
            <div className="card shadow-sm p-4 h-100">
              <h5 className="mb-4">Booking Summary</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>From:</strong> {fromValue || "-"}
                </li>
                <li className="list-group-item">
                  <strong>To:</strong> {toValue || "-"}
                </li>
                <li className="list-group-item">
                  <strong>Date:</strong> {dateValue || "-"}
                </li>
                <li className="list-group-item">
                  <strong>Time:</strong> {timeValue || "-"}
                </li>
                <li className="list-group-item">
                  <strong>Return Trip:</strong> {returnTrip ? "Yes" : "No"}
                </li>
                <li className="list-group-item">
                  <strong>Passengers:</strong> {passengerCount}
                </li>
                <li className="list-group-item">
                  <strong>Selected Car:</strong> {selectedCar?.title || "-"}
                </li>
                <li className="list-group-item">
                  <strong>Child Seat:</strong> {passengerData.childSeat}
                </li>
                <li className="list-group-item">
                  <strong>Special Requests:</strong>{" "}
                  {passengerData.specialRequests || "-"}
                </li>
                <li className="list-group-item">
                  <strong>Payment Method:</strong> {paymentMethod}
                </li>
                <li className="list-group-item">
                  <strong>Distance:</strong>{" "}
                  {distanceKm ? distanceKm.toFixed(2) + " km" : "-"}
                </li>
                <li className="list-group-item">
                  <strong>Price:</strong> {symbol}
                  {price ? `${convertPrice(price)}` : "-"}
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="col-lg-6">
            <div className="card shadow-sm h-100">
              <iframe
                loading="lazy"
                src={
                  fromValue && toValue
                    ? `https://maps.google.com/maps?q=${encodeURIComponent(fromValue + " to " + toValue)}&z=10&output=embed`
                    : "https://maps.google.com/maps?q=barcelona&z=10&output=embed"
                }
                width="100%"
                height="450"
                style={{ border: 0 }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Step({ number, title, active = false }: any) {
  return (
    <div
      className="d-flex me-4 mb-2"
      style={{
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <div
        className={`rounded-circle d-flex align-items-center justify-content-center fw-bold ${
          active ? "bg-primary text-white" : "bg-secondary text-white"
        }`}
        style={{ width: 40, height: 40 }}
      >
        {number}
      </div>
      <span className="ms-2 fw-semibold text-primary opacity-75">{title}</span>
    </div>
  );
}
