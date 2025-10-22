// js/scripts.js
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const firmwareTableBody = document.getElementById('firmwareTableBody');
    const loadingMessage = document.getElementById('loadingMessage');
    const noFirmwareMessage = document.getElementById('noFirmwareMessage');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const deviceFilter = document.getElementById('deviceFilter');
    const versionFilter = document.getElementById('versionFilter');
    
    // 页面加载时获取固件列表
    loadFirmwareList();
    
    // 搜索功能
    searchButton.addEventListener('click', function() {
        filterFirmwareList();
    });
    
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            filterFirmwareList();
        }
    });
    
    // 筛选功能
    deviceFilter.addEventListener('change', filterFirmwareList);
    versionFilter.addEventListener('change', filterFirmwareList);
    
    // 加载固件列表
    function loadFirmwareList() {
        // 显示加载状态
        loadingMessage.style.display = 'block';
        noFirmwareMessage.style.display = 'none';
        firmwareTableBody.innerHTML = '';
        
        // 获取固件数据
        const firmwareFiles = getFirmwareData();
        
        // 隐藏加载状态
        loadingMessage.style.display = 'none';
        
        if (firmwareFiles.length > 0) {
            displayFirmwareList(firmwareFiles);
        } else {
            // 如果没有固件文件，显示提示信息
            noFirmwareMessage.style.display = 'block';
        }
    }
    
    // 获取固件数据的函数（人工维护的固件列表）
    function getFirmwareData() {
        // 人工维护的固件列表，包含真实文件信息
        return [
            {
                name: 'xiaozhi.bin',
                device: '小智1.69寸LCD横屏版',
                version: 'v1.0.0',
                date: '2025-10-10', // 真实文件日期
                size: '2.54 MB', // 真实文件大小
                type: 'stable',
                path: 'images/xiaozhi.bin',

                name: 'xiaozhi.bin',
                device: '小智1.69寸LCD横屏版',
                version: 'v1.0.0',
                date: '2025-10-10', // 真实文件日期
                size: '2.54 MB', // 真实文件大小
                type: 'stable',
                path: 'images/xiaozhi.bin'
            }
            // 当添加新固件时，在此处添加新的对象
        ];
    }
}