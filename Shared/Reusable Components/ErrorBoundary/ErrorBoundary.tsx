import React from "react";
import { View, TouchableOpacity } from "react-native";
import { ThemedText } from "../HelperComponents/ThemedText";
import Constants from "@/Shared/Constants/Constants";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent
            error={this.state.error}
            resetError={this.resetError}
          />
        );
      }

      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            backgroundColor: Constants.colors.lightGray,
          }}
        >
          <ThemedText
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: Constants.colors.red,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Something went wrong
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 14,
              color: Constants.colors.darkGray,
              textAlign: "center",
              marginBottom: 30,
            }}
          >
            {this.state.error?.message || "An unexpected error occurred"}
          </ThemedText>
          <TouchableOpacity
            onPress={this.resetError}
            style={{
              backgroundColor: Constants.colors.primary,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 5,
            }}
          >
            <ThemedText
              style={{
                color: Constants.colors.white,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Try Again
            </ThemedText>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
