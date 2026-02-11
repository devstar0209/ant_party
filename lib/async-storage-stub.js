/**
 * Stub for @react-native-async-storage/async-storage
 * Used when MetaMask SDK is bundled for web - this package is only needed for React Native.
 */
export default {
  getItem: async () => null,
  setItem: async () => {},
  removeItem: async () => {},
  clear: async () => {},
  getAllKeys: async () => [],
  multiGet: async () => [],
  multiSet: async () => {},
  multiRemove: async () => {},
};
