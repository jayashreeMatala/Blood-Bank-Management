const achievementData = {
  stats: [
    { title: "Total Donations", value: 5, icon: "🩸" },
    { title: "Lives Saved", value: 15, icon: "❤️" },
    { title: "Camps Attended", value: 1, icon: "📅" },
    { title: "Unlocked Badges", value: 3, icon: "🏅" },
  ],

  unlocked: [
    { title: "First Drop", desc: "Completed your first donation" },
    { title: "Regular Hero", desc: "Completed 5 donations" },
    { title: "Camp Starter", desc: "Attended first donation camp" },
  ],

  locked: [
    { title: "Super Donor", current: 5, total: 10 },
    { title: "Life Champion", current: 5, total: 25 },
    { title: "Platinum Hero", current: 10, total: 50 },
    { title: "Camp Warrior", current: 1, total: 5 },
    { title: "Life Saver", current: 5, total: 10 },
    { title: "Century Hero", current: 15, total: 100 },
  ],

 leaderboard: [
  { name: "Vikram Singh", donations: 12, blood: "O-" },
  { name: "Amit Kumar", donations: 8, blood: "B+" },
  { name: "Rahul Sharma", donations: 5, blood: "A+" },
  { name: "Priya Patel", donations: 3, blood: "O+" },
  { name: "Sneha Reddy", donations: 2, blood: "AB+" },
]

};

export default achievementData;
