import requests
from urllib.parse import urlparse
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
import sys

def check_url(url, timeout=10):
    """
    Check if a URL is accessible and return status information.
    
    Args:
        url (str): The URL to check
        timeout (int): Timeout in seconds (default: 10)
    
    Returns:
        dict: Contains url, status, error_type, and response_time
    """
    # Add http:// if no scheme is provided
    if not url.startswith(('http://', 'https://')):
        url = 'https://' + url
    
    start_time = time.time()
    
    try:
        response = requests.get(url, timeout=timeout, allow_redirects=True)
        response_time = time.time() - start_time
        
        return {
            'url': url,
            'status': 'OK',
            'status_code': response.status_code,
            'error_type': None,
            'response_time': round(response_time, 2)
        }
        
    except requests.exceptions.Timeout:
        return {
            'url': url,
            'status': 'TIMEOUT',
            'status_code': None,
            'error_type': 'Connection timeout',
            'response_time': timeout
        }
        
    except requests.exceptions.ConnectionError as e:
        return {
            'url': url,
            'status': 'CONNECTION_ERROR',
            'status_code': None,
            'error_type': f'Connection error: {str(e)[:100]}...',
            'response_time': time.time() - start_time
        }
        
    except requests.exceptions.RequestException as e:
        return {
            'url': url,
            'status': 'ERROR',
            'status_code': None,
            'error_type': f'Request error: {str(e)[:100]}...',
            'response_time': time.time() - start_time
        }

def read_urls_from_file(filename):
    """Read URLs from a text file, one per line."""
    urls = []
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            for line in file:
                url = line.strip()
                if url and not url.startswith('#'):  # Skip empty lines and comments
                    urls.append(url)
        return urls
    except FileNotFoundError:
        print(f"Error: File '{filename}' not found.")
        return []
    except Exception as e:
        print(f"Error reading file: {e}")
        return []

def check_urls_batch(urls, timeout=10, max_workers=10):
    """
    Check multiple URLs concurrently.
    
    Args:
        urls (list): List of URLs to check
        timeout (int): Timeout per request in seconds
        max_workers (int): Maximum number of concurrent threads
    
    Returns:
        list: List of results for each URL
    """
    results = []
    
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        # Submit all tasks
        future_to_url = {executor.submit(check_url, url, timeout): url for url in urls}
        
        # Process completed tasks
        for i, future in enumerate(as_completed(future_to_url), 1):
            result = future.result()
            results.append(result)
            
            # Progress indicator
            print(f"Checked {i}/{len(urls)} URLs: {result['url']} - {result['status']}")
    
    return results

def main():
    # Configuration
    filename = input("Enter the filename containing URLs (or press Enter for 'urls.txt'): ").strip()
    if not filename:
        filename = 'urls.txt'
    
    timeout = input("Enter timeout in seconds (or press Enter for 10): ").strip()
    timeout = int(timeout) if timeout.isdigit() else 10
    
    print(f"\nReading URLs from '{filename}'...")
    urls = read_urls_from_file(filename)
    
    if not urls:
        print("No URLs found to check.")
        return
    
    print(f"Found {len(urls)} URLs to check.")
    print(f"Using timeout: {timeout} seconds")
    print("-" * 50)
    
    # Check all URLs
    results = check_urls_batch(urls, timeout=timeout)
    
    # Separate problematic URLs
    problematic_urls = [r for r in results if r['status'] != 'OK']
    working_urls = [r for r in results if r['status'] == 'OK']
    
    print("\n" + "=" * 50)
    print("SUMMARY")
    print("=" * 50)
    print(f"Total URLs checked: {len(results)}")
    print(f"Working URLs: {len(working_urls)}")
    print(f"Problematic URLs: {len(problematic_urls)}")
    
    if problematic_urls:
        print("\n" + "=" * 50)
        print("PROBLEMATIC URLs")
        print("=" * 50)
        
        # Group by error type
        timeout_urls = [r for r in problematic_urls if r['status'] == 'TIMEOUT']
        connection_error_urls = [r for r in problematic_urls if r['status'] == 'CONNECTION_ERROR']
        other_error_urls = [r for r in problematic_urls if r['status'] == 'ERROR']
        
        if timeout_urls:
            print(f"\nTIMEOUT ERRORS ({len(timeout_urls)}):")
            for result in timeout_urls:
                print(f"  - {result['url']}")
        
        if connection_error_urls:
            print(f"\nCONNECTION ERRORS ({len(connection_error_urls)}):")
            for result in connection_error_urls:
                print(f"  - {result['url']}")
                print(f"    Error: {result['error_type']}")
        
        if other_error_urls:
            print(f"\nOTHER ERRORS ({len(other_error_urls)}):")
            for result in other_error_urls:
                print(f"  - {result['url']}")
                print(f"    Error: {result['error_type']}")
        
        # Save problematic URLs to file
        with open('problematic_urls.txt', 'w', encoding='utf-8') as f:
            f.write("# Problematic URLs found during check\n")
            f.write(f"# Checked on: {time.strftime('%Y-%m-%d %H:%M:%S')}\n\n")
            
            if timeout_urls:
                f.write("# TIMEOUT ERRORS\n")
                for result in timeout_urls:
                    f.write(f"{result['url']}\n")
                f.write("\n")
            
            if connection_error_urls:
                f.write("# CONNECTION ERRORS\n")
                for result in connection_error_urls:
                    f.write(f"{result['url']}\n")
                f.write("\n")
            
            if other_error_urls:
                f.write("# OTHER ERRORS\n")
                for result in other_error_urls:
                    f.write(f"{result['url']}\n")
        
        print(f"\nProblematic URLs saved to 'problematic_urls.txt'")
    
    if working_urls:
        print(f"\nWORKING URLs ({len(working_urls)}):")
        for result in working_urls:
            print(f"  ✓ {result['url']} (Status: {result['status_code']}, Time: {result['response_time']}s)")

if __name__ == "__main__":
    print("URL Connection Checker")
    print("=" * 30)
    main()
