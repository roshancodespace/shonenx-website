import { Metadata } from 'next';
import { FormatsList } from "../../components/FormatsList";

export const metadata: Metadata = {
  title: "Supported Formats | ShonenX",
  description: "View the supported formats for anime and manga in ShonenX.",
};

export default function FormatsPage() {
  return <FormatsList />;
}
