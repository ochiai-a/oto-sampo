import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Gen() {
  return (
    <View style={styles.container}>
      <View style={styles.generatingBar}>
        <View style={styles.emptyBox}></View>
        <Text style={styles.generatingText}>GENERATING</Text>
        <View style={styles.emptyBox}></View>
      </View>

      <View style={styles.optionsContainer}>
        <Text style={styles.questionText}>どんな音を作りますか？</Text>

        <View style={styles.optionWrapper}>
          <Text style={styles.optionLabel}>テンポ</Text>
          <View style={styles.optionRow}>
            <View style={styles.optionItem}>
              <Text style={styles.optionText}>遅い</Text>
            </View>
            <View style={[styles.optionItem, styles.optionSelected]}>
              <Text style={styles.optionSelectedText}>普通</Text>
            </View>
            <View style={styles.optionItem}>
              <Text style={styles.optionText}>早い</Text>
            </View>
          </View>
        </View>

        <View style={styles.optionWrapper}>
          <Text style={styles.optionLabel}>楽器</Text>
          <View style={styles.optionRow}>
            {["ピアノ", "ストリング", "バイオリン", "ベース", "ギター", "ドラム"].map(
              (instrument, index) => (
                <View
                  key={index}
                  style={[styles.optionItem, instrument === "ベース" || instrument === "ギター" || instrument === "ドラム" ? styles.optionSelected : null]}>
                  <Text style={styles.optionText}>
                    {instrument}
                  </Text>
                </View>
              )
            )}
          </View>
        </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    flex: 1, // Make the container take up available space
    justifyContent: "flex-start", // Align children at the top
    alignItems: "center", // Center children horizontally
  },
  
  topBar: {
    width: 360,
    height: 45,
    paddingHorizontal: 24,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  timeText: {
    fontSize: 14,
    color: "#1D1B20",
  },
  icon: {
    width: 24,
    height: 24,
    backgroundColor: "#1D1B20",
  },
  signalWrapper: {
    width: 46,
    height: 17,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signal: {
    width: 17,
    height: 17,
    backgroundColor: "#1D1B20",
    opacity: 0.1,
  },
  signalFilled: {
    width: 17,
    height: 17,
    backgroundColor: "#1D1B20",
  },
  signalHalf: {
    width: 8,
    height: 15,
    backgroundColor: "#1D1B20",
    opacity: 0.3,
  },
  progressBar: {
    width: 360,
    height: 21,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 126,
  },
  progressFill: {
    width: 108,
    height: 4,
    backgroundColor: "#1D1B20",
    borderRadius: 12,
  },
  gradientBackground: {
    width: 360,
    height: 803,
    position: "absolute",
    top: 800,
    backgroundColor: "rgba(255, 0, 0, 0.5)", // Placeholder for gradient
  },
  timeDisplay: {
    position: "absolute",
    top: 302,
    left: 113,
    flexDirection: "row",
    gap: 24,
  },
  timeMarker: {
    fontSize: 8,
    color: "white",
  },
  generatingBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 360,
    paddingHorizontal: 22,
    top: 64,
  },
  generatingText: {
    color: "#8D8D8D",
    fontSize: 14,
  },
  emptyBox: {
    width: 24,
    height: 24,
  },
  generateButton: {
    width: 220,
    height: 60,
    backgroundColor: "#FF32C7",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 71,
    top: 642,
  },
  generateButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  optionsContainer: {
    paddingHorizontal: 22,
    marginTop: 128,
  },
  questionText: {
    fontSize: 28,
    fontWeight: "700",
  },
  optionWrapper: {
    marginTop: 22,
  },
  optionLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  optionRow: {
    flexDirection: "row",
    gap: 8,
  },
  optionItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#BBBBBB",
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    fontSize: 14,
    color: "#999898",
  },
  optionSelected: {
    backgroundColor: "#FEB9FC",
  },
  optionSelectedText: {
    fontSize: 14,
    color: "black",
    fontWeight: "700",
  },
});

export default Gen;
