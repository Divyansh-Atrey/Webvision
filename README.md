# Webvision

## Team Name - Code Commiters

## 📌 The Real-World Problem
In urban and semi-urban government hospitals and charitable clinics, the daily Outpatient Department (OPD) process suffers from major inefficiencies:
1. *Morning Stampedes:* Patients stand in massive physical lines starting as early as 6:00 AM just to get a paper token.
2. *Blind Waiting Trauma:* Patients are forced to sit packed in unventilated, overcrowded waiting halls for hours with zero visibility of the live queue.
3. *Fear of Missing Turns:* No remote tracking means patients cannot step out for water or use the restroom without risking losing their turn.
4. *Exclusion of Smaller Setups:* Existing healthcare enterprise systems are too expensive and complex for local trust-run clinics.

---

## 💡 The Solution: SwasthQueue
*SwasthQueue* solves this by providing a simple, mobile-friendly interface split into two core modules:
* *Staff Console:* A clean dashboard for the clinic receptionist or compounder to manage walk-ins and click *"Call Next Patient"* with a single button.
* *Patient Mobile Tracker:* A live remote tracker allowing patients to view current serving tokens, estimated wait times, and proximity alerts from home, their vehicle, or a nearby tea stall.

---

## 🛠️ Tech Stack Used
* *HTML5:* Semantic, clean structure with human-readable class names.
* *CSS3:* Responsive layout using custom properties (CSS variables), Flexbox, and Grid.
* *Vanilla JavaScript:* Clean state management, dynamic UI rendering, and interactive event handling without heavy frameworks or complex DOM libraries.

---

## 🚀 Key Features
* *Live Token Synchronization:* Real-time updates across the staff desk and patient mobile view.
* *Smart Proximity Alerts:* Automatic visual banners that notify patients when their turn is approaching.
* *Activity Logging:* Live tracking of chamber actions (Recall, Hold, SMS dispatch).
* *Walk-In Registration:* Quick form for issuing new digital tokens on the fly.
* *Zero-Install PWA Design:* Works seamlessly on any mobile browser without requiring app store downloads.

---

## 📂 Project Structure
```text
📦 opd-queue-live
 ┣ 📜 index.html    # Main HTML structure containing staff, patient, and registration views
 ┣ 📜 style.css     # Clean stylesheet governing layout, components, and responsive design
 ┗ 📜 script.js     # Core application logic, token state, and interactive functions
