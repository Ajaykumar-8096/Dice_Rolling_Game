from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

# ============================
# In-memory score storage
# ============================
scores = []

# ============================
# Home Route
# ============================
@app.route("/")
def index():
    return render_template("index.html")

# ============================
# Roll Dice Route
# ============================
@app.route("/roll")
def roll():
    dice_value = random.randint(1, 6)

    scores.append({
        "player": "Player 1",
        "score": dice_value
    })

    return jsonify({"dice": dice_value})

# ============================
# Leaderboard Route
# ============================
@app.route("/leaderboard")
def leaderboard():
    if not scores:
        return jsonify({
            "total_games": 0,
            "highest_score": 0,
            "lowest_score": 0,
            "average_score": 0
        })

    all_scores = [s["score"] for s in scores]

    return jsonify({
        "total_games": len(all_scores),
        "highest_score": max(all_scores),
        "lowest_score": min(all_scores),
        "average_score": round(sum(all_scores) / len(all_scores), 2)
    })

# ============================
# Run App
# ============================
if __name__ == "__main__":
    app.run(debug=True)
