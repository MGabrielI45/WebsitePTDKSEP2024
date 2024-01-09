export const getReminders = async () => {
  const res = await fetch(process.env.URL + "/api/event", {
    method: "GET",
  });

  if (res.ok) {
    console.log("success");
  } else {
    console.log("error");
  }

  const reminders = await res.json();
  return reminders;
};

export const createTugas = async (data) => {
  const res = await fetch(process.env.URL + "/api/event/tugas", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (res.ok) {
    console.log("success");
  } else {
    console.log("error");
  }

  const tugas = await res.json();
  return tugas;
};

export const getTugas = async () => {
  const res = await fetch(process.env.URL + "/api/event/tugas", {
    method: "GET",
  });

  if (res.ok) {
    console.log("success");
  } else {
    console.log("error");
  }

  const tugas = await res.json();
  return tugas;
};

export const createDay = async (data) => {
  const res = await fetch(process.env.URL + "/api/event/day", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (res.ok) {
    console.log("success");
  } else {
    console.log("error");
  }

  const day = await res.json();
  return day;
};
