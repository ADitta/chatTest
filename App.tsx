import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";

import { StreamChat } from "stream-chat";
import { useEffect, useState } from "react";
import {
	OverlayProvider,
	Chat,
	ChannelList,
	Channel,
	DeepPartial,
	Theme,
	MessageList,
	MessageInput,
} from "stream-chat-expo";
import { Text } from "react-native";
import { StreamColors } from "./src/constants/Colors";

const API_KEY = "556hs76mkyz2";
const client = StreamChat.getInstance(API_KEY);

const theme: DeepPartial<Theme> = {
	colors: StreamColors,
};
export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();
	const [isReady, setIsReady] = useState(false);
	const [selectedChannel, setSelectedChannel] = useState(null);
	const connectUser = async () => {
		// SIgn in with bakend and get user token, link it in connectUser
		await client.connectUser(
			{
				id: "Asim",
				name: "Asim",
				image: "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
			},
			client.devToken("Asim")
		);
		setIsReady(true);

		// Create a channel
		// const channel = client.channel("team", "general", { name: "General" });

		// await channel.create();
	};

	useEffect(() => {
		connectUser();
	}, []);

	const onChannelSelect = (channel) => {
		setSelectedChannel(channel);
	};

	if (!isLoadingComplete || !isReady) {
		return null;
	} else {
		return (
			<SafeAreaProvider>
				<OverlayProvider>
					<Chat client={client}>
						{/* <Navigation colorScheme={colorScheme} /> */}
						{!selectedChannel ? (
							<ChannelList
								onSelect={(channel) => {
									setSelectedChannel(channel);
								}}
							/>
						) : (
							<>
								<Channel channel={selectedChannel}>
									<Text
										style={{
											margin: 40,
										}}
										onPress={() => setSelectedChannel(null)}
									>
										Go Back
									</Text>
									<MessageList />
									<MessageInput />
								</Channel>
							</>
						)}
					</Chat>
				</OverlayProvider>
				<StatusBar />
			</SafeAreaProvider>
		);
	}
}
