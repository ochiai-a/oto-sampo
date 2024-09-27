import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Explorer() {
  return (
    <View>
      <div
        style={{
          width: "100%",
          height: "100%",
          paddingTop: 22,
          paddingBottom: 22,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 32,
          display: "flex",
        }}
      >
        <div
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 12,
            display: "flex",
          }}
        >
          <div
            style={{
              paddingLeft: 22,
              paddingRight: 22,
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 12,
              display: "flex",
            }}
          >
            <div
              style={{
                color: "black",
                fontSize: 28,
                fontFamily: "Roboto",
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              この音、インスタで
              <br />
              使ってみませんか
            </div>
            <div
              style={{
                width: 12.52,
                fontSize: 16,
                fontFamily: "Roboto",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            ></div>
          </div>
          <div
            style={{
              width: 338,
              paddingLeft: 22,
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 12,
              display: "flex",
            }}
          >
            <div
              style={{
                width: 316,
                height: 316,
                position: "relative",
                borderRadius: 10,
                border: "1px black solid",
                backdropFilter: "blur(9.40px)",
              }}
            >
              <div
                style={{
                  width: 316,
                  height: 316,
                  left: 0,
                  top: 0,
                  position: "absolute",
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, black 100%)",
                  borderRadius: 5,
                }}
              />
              <div
                style={{
                  width: 263.33,
                  height: 91.29,
                  left: 21.07,
                  top: 201.89,
                  position: "absolute",
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontSize: 36,
                    fontFamily: "Roboto",
                    fontWeight: "700",
                    lineHeight: 43.2,
                    letterSpacing: 1.8,
                    wordWrap: "break-word",
                  }}
                >
                  共有数TOP10
                  <br />
                </span>
                <span
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontFamily: "Roboto",
                    fontWeight: "500",
                    lineHeight: 19.2,
                    letterSpacing: 0.4,
                    wordWrap: "break-word",
                  }}
                >
                  <br />
                  作った音をインスタ、Tiktokに共有
                  <br />
                  してポストしてみましょう。
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 12,
            display: "flex",
          }}
        >
          <div
            style={{
              paddingLeft: 22,
              paddingRight: 22,
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 12,
              display: "flex",
            }}
          >
            <div
              style={{
                color: "black",
                fontSize: 28,
                fontFamily: "Roboto",
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              夏におすすめ
            </div>
            <div
              style={{
                width: 12.52,
                fontSize: 16,
                fontFamily: "Roboto",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            ></div>
          </div>
          <div
            style={{
              width: 338,
              paddingLeft: 22,
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 12,
              display: "flex",
            }}
          >
            {[
              "世界各地の海辺で作られた音",
              "風流を楽しもう",
              "Lorem Ipsum",
            ].map((text, index) => (
              <div
                key={index}
                style={{
                  width: 240,
                  height: 180,
                  position: "relative",
                  borderRadius: 10,
                  border: "1px white solid",
                  backdropFilter: "blur(9.40px)",
                }}
              >
                <div
                  style={{
                    width: 240,
                    height: 180,
                    left: 0,
                    top: 0,
                    position: "absolute",
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, black 100%)",
                    borderRadius: 5,
                  }}
                />
                <div
                  style={{
                    width: 200,
                    height: 52,
                    left: 16,
                    top: 115,
                    position: "absolute",
                    color: "white",
                    fontSize: 24,
                    fontFamily: "Roboto",
                    fontWeight: "500",
                    wordWrap: "break-word",
                  }}
                >
                  {text.split("<br/>").map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </View>
  );
}

export default Explorer;
