pluginManagement { includeBuild("../node_modules/@react-native/gradle-plugin") }
plugins { id("com.facebook.react.settings") }

rootProject.name = "LearnSphere"
include(":app")
includeBuild("../node_modules/@react-native/gradle-plugin")

include(":@react-native-async-storage_async-storage")
project(":@react-native-async-storage_async-storage").projectDir = java.io.File(rootProject.projectDir, "../node_modules/@react-native-async-storage/async-storage/android")

include(":react-native-screens")
project(":react-native-screens").projectDir = java.io.File(rootProject.projectDir, "../node_modules/react-native-screens/android")

include(":react-native-safe-area-context")
project(":react-native-safe-area-context").projectDir = java.io.File(rootProject.projectDir, "../node_modules/react-native-safe-area-context/android")

include(":@react-native-community_netinfo")
project(":@react-native-community_netinfo").projectDir = java.io.File(rootProject.projectDir, "../node_modules/@react-native-community/netinfo/android")
