import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://mmrilehfdinkxcnuctwe.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tcmlsZWhmZGlua3hjbnVjdHdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzNjIyNjUsImV4cCI6MjA0MDkzODI2NX0.IfaATjuwAfeZTaC8HDATGM5CVRJyBgfxpJrs98TwKg0"
);

console.log("supabase", supabase);

function App() {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        getCountries();
    }, []);

    async function getCountries() {
        try {
            const { data, error } = await supabase.from("countries").select();

            if (error) {
                console.error("Error fetching countries: ", error.message);
            } else if (data.length === 0) {
                console.log("No countries found.");
            } else {
                console.log("Countries fetched successfully: ", data);
                setCountries(data);
            }
        } catch (error) {
            console.error("Unexpected error: ", error.message);
        }
    }

    return (
        <ul>
            {countries.map((country) => (
                <li key={country.name}>{country.name}</li>
            ))}
        </ul>
    );
}

export default App;
