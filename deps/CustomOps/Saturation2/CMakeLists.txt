add_library(Saturation SHARED Saturation.cpp)
set_property(TARGET Saturation PROPERTY POSITION_INDEPENDENT_CODE ON)
target_link_libraries(Saturation ${TF_LIB_FILE})
file(MAKE_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}/build)
set_target_properties(Saturation PROPERTIES LIBRARY_OUTPUT_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}/build)
