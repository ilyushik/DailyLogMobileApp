import { View, StyleSheet, Image, Pressable, Text } from "react-native";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export default function ReportRequestInfoModal(props) {
    const [request, setRequest] = useState(null); // Начальное состояние: null

    const report = props.report;

    const fetchRequestHandler = async () => {
        if (report?.request) {
            try {
                const response = await axios.get(
                    `http://localhost:8080/requests/request/${report.request}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${await SecureStore.getItemAsync("jwt_token")}`,
                        },
                    }
                );

                setRequest(response.data);
            } catch (e) {
                console.error(e.response?.data || e.message);
            }
        }
    };

    useEffect(() => {
        fetchRequestHandler();
    }, [report]);

    return (
        <View style={styles.reportModalContainer}>
            <View style={styles.reportRequestInfoContainer}>
                <Pressable style={styles.closeModalReportButton} onPress={props.closeModal}>
                    <Image
                        style={styles.closeModalReportIcon}
                        source={require("../images/close_modal.png")}
                        resizeMode="contain"
                    />
                </Pressable>

                {report?.request === null && (
                    <View style={styles.reportInfoContainer}>
                        <Text style={styles.reportRequestModalTitle}>My report</Text>

                        <View style={styles.reportInfoBlock}>
                            <View style={styles.reportBlockTitles}>
                                <Text style={styles.reportBlockTitleText}>Date:</Text>
                                <Text style={styles.reportBlockTitleText}>Amount of hours:</Text>
                                <Text style={styles.reportBlockTitleText}>Comment:</Text>
                            </View>

                            <View style={styles.reportBlockValues}>
                                <Text style={styles.reportBlockValueText}>
                                    {report.date?.join("-")}
                                </Text>
                                <Text style={styles.reportBlockValueText}>
                                    {report.countOfHours}
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.reportBlockValueComment}>{report.text}</Text>
                    </View>
                )}

                {report?.request !== null && request && (
                    <View style={styles.reportInfoContainer}>
                        <Text style={styles.reportRequestModalTitle}>My request</Text>

                        <View style={styles.reportInfoBlock}>
                            <View style={styles.reportBlockTitles}>
                                <Text style={styles.reportBlockTitleText}>Reason:</Text>
                                <Text style={styles.reportBlockTitleText}>Start date:</Text>
                                <Text style={styles.reportBlockTitleText}>End date:</Text>
                                <Text style={styles.reportBlockTitleText}>Comment:</Text>
                            </View>

                            <View style={styles.reportBlockValues}>
                                <Text style={styles.reportBlockValueText}>
                                    {request.reason || "N/A"}
                                </Text>
                                <Text style={styles.reportBlockValueText}>
                                    {request.startDate?.join("-") || "N/A"}
                                </Text>
                                <Text style={styles.reportBlockValueText}>
                                    {request.finishDate?.join("-") || "N/A"}
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.reportBlockValueComment}>
                            {request.comment || "No comment"}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    reportModalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    reportRequestInfoContainer: {
        backgroundColor: "#fff",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        width: "100%",
    },
    closeModalReportButton: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    closeModalReportIcon: {
        width: 30,
        height: 30,
    },
    reportInfoContainer: {
        paddingBottom: 50,
    },
    reportRequestModalTitle: {
        fontSize: 20,
        fontWeight: "500",
        alignSelf: "center",
    },
    reportInfoBlock: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    reportBlockTitles: {
        rowGap: 15,
    },
    reportBlockTitleText: {
        fontSize: 15,
        fontWeight: "500",
        color: "#696969",
    },
    reportBlockValues: {
        rowGap: 15,
    },
    reportBlockValueText: {
        fontSize: 15,
        fontWeight: "500",
        alignSelf: "flex-end",
    },
    reportBlockValueComment: {
        fontSize: 15,
        fontWeight: "500",
        paddingHorizontal: 30,
    },
});
